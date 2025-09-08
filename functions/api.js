export async function fetchPage(context) {
  const { env, request } = context;

  const baseUrl = env.API_CONNECTION;

  const url = new URL(request.url);
  const path = url.pathname;

  try {
    const response = await fetch(`${baseUrl}${path}`);
    const routes = ['/', '/about', '/news', '/gallery', '/resources', '/contacts']

    if (!response.ok) {
      return new Response('Error fetching page or page does\'t exist', { status: 400 });
    } 

    const page = await response.text()
    const modifiedPage = page.replace(
          /"(\/?[^"]+)(\.(css|js|png|jpg|jpeg|gif|svg))"/g,
          (match, filePath, fileType) => (!filePath.includes('splinetool')) ? `"${baseUrl}${filePath}${fileType}"` : `${filePath}${fileType}`
        );

    return new Response(modifiedPage, {
      headers: { 'Content-Type': 'text/html' }
    });

  }
  catch(error) {
    return new Response('Error fetching the page', { status: 500 });
  }

}