
export const blockToPython = (block) => {
  switch (block.type) {
    case 'speaker_play':
      return "playsound('sound.mp3')";
    default:
      return `# Unknown block: ${block.label}`;
  }
};

// Combine all blocks into one Python script
export const generatePythonCode = (blocks) => {
  return blocks.map(blockToPython).join("\n");
};
