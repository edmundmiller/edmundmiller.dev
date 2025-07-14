import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export function remarkAdmonitions() {
  return (tree: Root) => {
    visit(tree, (node: any) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const data = node.data || (node.data = {});
        const hName = 'Admonition';
        const hProperties: any = {};

        // Set the type based on the directive name
        if (node.name) {
          hProperties.type = node.name;
        }

        // Parse attributes from the directive
        if (node.attributes) {
          Object.entries(node.attributes).forEach(([key, value]) => {
            if (key === 'title') {
              hProperties.title = value;
            } else if (key === 'icon') {
              hProperties.icon = value;
            } else if (key === 'collapse' || key === 'collapsible') {
              hProperties.collapsible = true;
              if (value === 'true' || value === '') {
                hProperties.collapsed = false;
              } else if (value === 'false') {
                hProperties.collapsed = false;
              } else {
                hProperties.collapsed = true;
              }
            }
          });
        }

        data.hName = hName;
        data.hProperties = hProperties;
      }
    });
  };
}
