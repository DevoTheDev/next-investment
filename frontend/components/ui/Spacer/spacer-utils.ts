import { Spaces } from "./spacer-types";

export const spacing = (space: Spaces) => {
    switch (space) {
        // Top spacing
        case 'top-extra-small':
            return 'mt-2';
        case 'top-small':
            return 'mt-6';
        case 'top-medium':
            return 'mt-10';
        case 'top-large':
            return 'mt-16';
        case 'top-extra-large':
            return 'mt-24';
        case 'top-massive':
            return 'mt-32';
        case "top-Woah, you're big":
            return 'mt-40';
        case "top-Oh my god, you're huge":
            return 'mt-48';
        case "top-DAD!?":
            return 'mt-56';

        // Left spacing
        case 'left-extra-small':
            return 'ml-2';
        case 'left-small':
            return 'ml-6';
        case 'left-medium':
            return 'ml-10';
        case 'left-large':
            return 'ml-16';
        case 'left-extra-large':
            return 'ml-24';
        case 'left-massive':
            return 'ml-32';
        case "left-Woah, you're big":
            return 'ml-40';
        case "left-Oh my god, you're huge":
            return 'ml-48';
        case "left-DAD!?":
            return 'ml-56';

        // Right spacing
        case 'right-extra-small':
            return 'mr-2';
        case 'right-small':
            return 'mr-6';
        case 'right-medium':
            return 'mr-10';
        case 'right-large':
            return 'mr-16';
        case 'right-extra-large':
            return 'mr-24';
        case 'right-massive':
            return 'mr-32';
        case "right-Woah, you're big":
            return 'mr-40';
        case "right-Oh my god, you're huge":
            return 'mr-48';
        case "right-DAD!?":
            return 'mr-56';

        // Bottom spacing
        case 'bottom-extra-small':
            return 'mb-2';
        case 'bottom-small':
            return 'mb-6';
        case 'bottom-medium':
            return 'mb-10';
        case 'bottom-large':
            return 'mb-16';
        case 'bottom-extra-large':
            return 'mb-24';
        case 'bottom-massive':
            return 'mb-32';
        case "bottom-Woah, you're big":
            return 'mb-40';
        case "bottom-Oh my god, you're huge":
            return 'mb-48';
        case "bottom-DAD!?":
            return 'mb-56';

        // Vertical spacing (top & bottom)
        case 'vertical-extra-small':
            return 'my-2';
        case 'vertical-small':
            return 'my-6';
        case 'vertical-medium':
            return 'my-10';
        case 'vertical-large':
            return 'my-16';
        case 'vertical-extra-large':
            return 'my-24';
        case 'vertical-massive':
            return 'my-32';
        case "vertical-Woah, you're big":
            return 'my-40';
        case "vertical-Oh my god, you're huge":
            return 'my-48';
        case "vertical-DAD!?":
            return 'my-56';

        // Horizontal spacing (left & right)
        case 'horizontal-extra-small':
            return 'mx-2';
        case 'horizontal-small':
            return 'mx-6';
        case 'horizontal-medium':
            return 'mx-10';
        case 'horizontal-large':
            return 'mx-16';
        case 'horizontal-extra-large':
            return 'mx-24';
        case 'horizontal-massive':
            return 'mx-32';
        case "horizontal-Woah, you're big":
            return 'mx-40';
        case "horizontal-Oh my god, you're huge":
            return 'mx-48';
        case "horizontal-DAD!?":
            return 'mx-56';

        // All sides spacing
        case 'extra-small':
            return 'm-2';
        case 'small':
            return 'm-6';
        case 'medium':
            return 'm-10';
        case 'large':
            return 'm-16';
        case 'extra-large':
            return 'm-24';
        case 'massive':
            return 'm-32';
        case "Woah, you're big":
            return 'm-40';
        case "Oh my god, you're huge":
            return 'm-48';
        case "DAD!?":
            return 'm-56';

        // Default case for undefined spacing
        default:
            return '';
    }
}
