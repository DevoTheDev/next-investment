import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generate() {
    const randomKey = (length: number, otherText?: string | number): string => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }

  return result + otherText;
    }

    return {
      randomKey
    }
}

export function capitalize(key: string) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

// Utility function to convert camelCase or snake_case to readable format
export const formatHeader = (key: string): string => {
  // Handle snake_case by splitting at underscores and capitalizing
  if (key.includes('_')) {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Handle camelCase by inserting spaces before capital letters and capitalizing
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before capital letters
    .replace(/^[a-z]/, str => str.toUpperCase()); // Capitalize the first letter
};

export default formatHeader;

/* 
Function to take an array of loosely typed objects
and extract an array of all the unique keys in the array.
*/

export function extractUniqueKeys<T extends object>(data: T[]): string[] {
  const uniqueKeys = new Set<string>();

  data.forEach(item => {
      Object.keys(item).forEach(key => {
          uniqueKeys.add(key); // Add each key to the Set
      });
  });

  return Array.from(uniqueKeys); // Convert the Set to an array
}

export const isFalsy = (val: any) => {
  
  return [null, undefined, false, "", "n/a", "N/A"].some((falsy) => {
      if(val !== falsy) {
          return false
      }
      return true;
  })
}

export const isObject = (item: any) => {
  // Verifies that an object is just an object and not an array.
  return typeof item === 'object' && item && (!item.map);
};

export const isString = (item: any) => {
  return typeof item === 'string';
};

export const isNumber = (item: any) => {
  return typeof item === 'number';
};

export const isArray = (item: any) => {
    if(item && (item.map)) {
      return true;
    } else {
      return false;
    }
}

export const validateForUse = <T, K extends keyof T>(data: T): Partial<T> => {
  const ready = {} as Partial<T>;
  for (const key in data) {
      const value = data[key as K];
      if (value !== undefined && value !== null && !(Array.isArray(value) && value.length === 0)) {
          ready[key as K] = value;
      }
  }
  return ready;
};

