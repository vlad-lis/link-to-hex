const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
};

export default copyToClipboard;
