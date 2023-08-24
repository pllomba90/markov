const { generateTextFromSource } = require('../makeText'); 
const axios = require('axios'); 

jest.mock('axios'); 

describe('generateTextFromSource', () => {
  test('should generate text from a file', async () => {
    axios.get.mockResolvedValue({ data: 'file content' });
    const generatedText = await generateTextFromSource('file', 'filename.txt');
    expect(generatedText).toBeTruthy();
   
  });

  test('should generate text from a URL', async () => {
    axios.get.mockResolvedValue({ data: 'URL content' });
    const generatedText = await generateTextFromSource('url', 'http://example.com');
    expect(generatedText).toBeTruthy();
  });

  test('should handle errors when reading source', async () => {
    axios.get.mockRejectedValue(new Error('Failed to read source'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await generateTextFromSource('url', 'http://example.com');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error reading source:', 'Failed to read source');
    consoleErrorSpy.mockRestore();
  });
});
