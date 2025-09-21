export const toFullName = (firstName: string, midName: string, lastName: string, language: string) => {
  if (language === 'vi') {
    return `${firstName ? firstName : ''} ${midName ? midName : ''} ${lastName ? lastName : ''}`.trim()
  }
  return ` ${lastName} ${midName} ${firstName}`.trim()
}

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })
