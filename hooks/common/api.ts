export async function loadBulk<T extends object>(pageDataPromises: Record<keyof T, Promise<T[keyof T]>>): Promise<T> {
  const pageDataPromisesAsArray = []
  const pageDataFieldNames = []
  const pageData = {} as T

  for (const pageDataFieldName in pageDataPromises) {
    const pageDataPromise = pageDataPromises[pageDataFieldName]
    pageDataPromisesAsArray.push(pageDataPromise)
    pageDataFieldNames.push(pageDataFieldName)
  }

  const pageDataAsArray = await Promise.all(pageDataPromisesAsArray)
  for (let i = 0; i < pageDataAsArray.length; i++) {
    const pageDataFieldName = pageDataFieldNames[i]
    const pageDataFieldValue = pageDataAsArray[i]
    pageData[pageDataFieldName] = pageDataFieldValue as any
  }
  
  return pageData
}
