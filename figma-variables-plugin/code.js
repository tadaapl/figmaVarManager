/* code.js - Main plugin script for Figma Variables Plugin with local variable management integration */

figma.showUI(__html__, { width: 320, height: 600 });

// Function to load local variables from the document
async function loadLocalVariables() {
  try {
    const variables = await figma.variables.getLocalVariablesAsync();
    figma.ui.postMessage({ type: 'loadVariablesSuccess', variables: variables });
  } catch (error) {
    figma.ui.postMessage({ type: 'loadVariablesError', message: error.message });
  }
}

// Function to create a new local variable in a collection
async function createLocalVariable(name, collectionId, variableType) {
  try {
    const collection = await figma.variables.getVariableCollectionByIdAsync(collectionId);
    if (!collection) {
      throw new Error("Collection not found");
    }
    const variable = figma.variables.createVariable(name, collection, variableType);
    figma.ui.postMessage({ type: 'createVariableSuccess', variable: variable });
  } catch (error) {
    figma.ui.postMessage({ type: 'createVariableError', message: error.message });
  }
}

// Function to update a local variable's value for a specific mode
async function updateLocalVariable(variableId, modeId, value) {
  try {
    const variable = await figma.variables.getVariableByIdAsync(variableId);
    if (!variable) throw new Error("Variable not found");
    variable.setValueForMode(modeId, value);
    figma.ui.postMessage({ type: 'updateVariableSuccess', variableId: variableId });
  } catch (error) {
    figma.ui.postMessage({ type: 'updateVariableError', message: error.message });
  }
}

// Function to delete a variable collection (which deletes all associated variables)
async function deleteLocalVariableCollection(collectionId) {
  try {
    const collection = await figma.variables.getVariableCollectionByIdAsync(collectionId);
    if (collection) {
      collection.remove();
      figma.ui.postMessage({ type: 'deleteVariableSuccess', collectionId: collectionId });
    } else {
      throw new Error("Collection not found");
    }
  } catch (error) {
    figma.ui.postMessage({ type: 'deleteVariableError', message: error.message });
  }
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'loadVariables') {
    await loadLocalVariables();
  } else if (msg.type === 'createVariable') {
    const { name, collectionId, variableType } = msg;
    await createLocalVariable(name, collectionId, variableType);
  } else if (msg.type === 'updateVariable') {
    const { variableId, modeId, value } = msg;
    await updateLocalVariable(variableId, modeId, value);
  } else if (msg.type === 'deleteVariable') {
    const { collectionId } = msg;
    await deleteLocalVariableCollection(collectionId);
  } else if (msg.type === 'alert') {
    figma.notify(msg.message);
  }
};

// Send an initial message to the UI
figma.ui.postMessage({ type: 'initialize', variables: [] });

console.log('Figma Variables Plugin main script loaded with local variable management integration.');
