/* code.js - Main plugin script for Figma Variables Plugin */

figma.showUI(__html__, { width: 320, height: 600 });

figma.ui.onmessage = (msg) => {
  if (msg.type === 'alert') {
    figma.notify(msg.message);
  }
  // Additional message handlers can be added here
};

// Optionally, send an initial message to the UI
figma.ui.postMessage({ type: 'initialize', variables: [] });

console.log('Figma Variables Plugin main script loaded and UI shown.');
