import { fetchPage } from '../api'

export async function onRequest(context) {
  
  const targetPage = await fetchPage(context);
  return targetPage;
}