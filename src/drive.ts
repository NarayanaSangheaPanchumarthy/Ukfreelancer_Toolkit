import { getAccessToken } from './auth';

export const saveFileToDrive = async (filename: string, content: string, mimeType = 'text/csv') => {
  try {
    const token = await getAccessToken(true);
    
    const metadata = {
      name: filename,
      mimeType: mimeType,
    };

    const boundary = '-------314159265358979323846';
    const delimiter = "\\r\\n--" + boundary + "\\r\\n";
    const close_delim = "\\r\\n--" + boundary + "--";

    const multipartRequestBody =
      delimiter +
      'Content-Type: application/json; charset=UTF-8\\r\\n\\r\\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: ' + mimeType + '\\r\\n\\r\\n' +
      content +
      close_delim;

    const request = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    });
    
    if (!request.ok) {
      throw new Error('Failed to upload file to Google Drive');
    }
    
    return await request.json();
  } catch (error) {
    console.error('Error saving to Drive:', error);
    throw error;
  }
};
