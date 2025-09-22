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

export const separationFullName = (fullName: string, language: string) => {
  const result = {
    firstName: '',
    middleName: '',
    lastName: ''
  }
  const arrFullName = fullName.trim().split(' ')?.filter(Boolean)
  if (arrFullName.length === 1) {
    if (language === 'vi') {
      result.firstName = arrFullName[0]
    } else {
      result.lastName = arrFullName[0]
    }
  } else if (arrFullName.length === 2) {
    if (language === 'vi') {
      result.firstName = arrFullName[0]
      result.lastName = arrFullName[1]
    } else {
      result.lastName = arrFullName[0]
      result.firstName = arrFullName[1]
    }
  } else if (arrFullName.length >= 3) {
    if (language === 'vi') {
      result.firstName = arrFullName[0]
      result.middleName = arrFullName.slice(1, arrFullName.length - 1).join(' ')
      result.lastName = arrFullName[arrFullName.length - 1]
    } else {
      result.lastName = arrFullName[0]
      result.middleName = arrFullName.slice(1, arrFullName.length - 1).join(' ')
      result.firstName = arrFullName[arrFullName.length - 1]
    }
  }
  return result
}
