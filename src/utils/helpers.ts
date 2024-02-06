export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
};

export const lastSelectedOption = (
  filters: string[],
  label: string
): string => {
  if (filters.includes(`asc_${label}`)) {
    return `asc_${label}`;
  }
  if (filters.includes(`desc_${label}`)) {
    return `desc_${label}`;
  }

  return 'none';
};
