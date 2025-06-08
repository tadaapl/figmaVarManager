# Figma Variables Plugin Documentation

This documentation provides an overview of the Figma Variables Plugin implementation. The plugin uses Figma's Plugin API to manage local variables (list, create, update, delete) in real time. It includes:

- **manifest.json**: Configures plugin metadata and permissions using the teamlibrary and proposed API.
- **code.js**: Implements the plugin backend with functions to load, create, update, and delete local variables using `figma.variables` API methods.
- **ui.html**: Implements a responsive UI built with HTML, TailwindCSS, and FontAwesome, which supports searching, filtering, and CRUD operations for variables.

### Installation & Setup

1. **Clone the Repository**: Ensure the project files are in `/code/figma-variables-plugin`.
2. **Dependencies**: Install any required dependencies (e.g., via npm if applicable).
3. **Running the Plugin**: Use Figma's plugin runner. For UI development, a static server is started on port 3000 via `npx serve /code/figma-variables-plugin -l 3000`.

### API Endpoints & Functionality

- **Load Variables**: Retrieves local variables via `figma.variables.getLocalVariablesAsync()` and posts the list to the UI.
- **Create Variable**: Creates a variable using `figma.variables.createVariable(name, collection, type)` after validating the collection.
- **Update Variable**: Updates a variable's value via `variable.setValueForMode(modeId, value)` once the variable is retrieved with `figma.variables.getVariableByIdAsync()`.
- **Delete Variable**: Deletes a variable collection (and its variables) using the collection's `remove()` method.

### Running in Development

- **Static Server**: The UI is served via a daemon on port 3000. Ensure that daemons and environment variables are properly set.
- **Testing**: Automated testing includes interactive UI tests using tools like `interactive_web_ui_tool` to simulate user interactions and validate error handling and notifications.

### Notes

- **Permissions**: The plugin requires `teamlibrary` permission and `enableProposedApi` flag is set to true.
- **Design Guidelines**: The UI follows Figma’s design guidelines with responsive components and realistic error handling.

*This documentation is intended to serve as a guide for both users and developers to understand and extend the functionality of the Figma Variables Plugin.*
