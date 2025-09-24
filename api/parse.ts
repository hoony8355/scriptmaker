import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';

export const config = {
  runtime: 'edge',
};

// Helper to recursively find all text values ('a:t') in the parsed XML object
const extractTextFromNode = (node: any): string => {
  let text = '';
  if (!node) {
    return text;
  }

  // If the node is an 'a:t' element, return its text content
  if (node['a:t']) {
    // Content can be a string or an array of text parts
    if (Array.isArray(node['a:t'])) {
        return node['a:t'].map(t => t['#text'] || t).join('');
    }
    return node['a:t']['#text'] || node['a:t'] || '';
  }

  // If the node is an array, iterate over its items
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join('');
  }

  // If the node is an object, iterate over its properties
  if (typeof node === 'object') {
    for (const key in node) {
      text += extractTextFromNode(node[key]);
    }
  }
  
  return text;
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { file: base64File } = await req.json();

    if (!base64File) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const zip = await JSZip.loadAsync(base64File, { base64: true });
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
        textNodeName: '#text',
        isArray: (name, jpath) => jpath === 'p:sld.cSld.spTree.sp' || jpath === 'p:sld.cSld.spTree.grpSp' || jpath.endsWith('.r'),
    });

    const slidePromises = [];
    for (const fileName in zip.files) {
        if (fileName.match(/^ppt\/slides\/slide\d+\.xml$/)) {
            slidePromises.push({
                number: parseInt(fileName.match(/(\d+)/)![0], 10),
                promise: zip.files[fileName].async('string')
            });
        }
    }

    if (slidePromises.length === 0) {
        throw new Error("No slides found in the PPTX file.");
    }
    
    slidePromises.sort((a, b) => a.number - b.number);

    const slideXmlContents = await Promise.all(slidePromises.map(p => p.promise));

    const allSlidesText = slideXmlContents.map((xmlContent, index) => {
      const jsonObj = parser.parse(xmlContent);
      const slideText = extractTextFromNode(jsonObj['p:sld']?.['p:cSld']?.['p:spTree']);
      return `Slide ${index + 1}:\n${slideText.replace(/\s+/g, ' ').trim()}`;
    }).join('\n\n---SLIDE BREAK---\n\n');

    if (!allSlidesText.trim()) {
        throw new Error("Could not extract any text from the presentation slides.");
    }

    return new Response(JSON.stringify({ slideContent: allSlidesText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in /api/parse:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
    return new Response(JSON.stringify({ error: `Failed to parse PPTX file: ${errorMessage}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
