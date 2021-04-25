const fs = require('fs')
const path = require('path')

// const contactsPath = path.resolve('db')
const contactsPath = path.resolve('db/contacts.json')

const rewriteFile = data => {
  try {
    fs.writeFileSync(contactsPath, JSON.stringify(data))
  }
  catch (err) {
    console.log(err)
  }
}

// TODO: задокументировать каждую функцию
function listContacts() {
  let contacts;

  try {
    contacts = fs.readFileSync(contactsPath)
  }
  catch (err){
    console.log(err)
  }

  return JSON.parse(contacts)
}

function getContactById(contactId) {
  return listContacts().find(({id}) => id === Number(contactId))
}

async function removeContact(contactId) {
  const contacts = listContacts().filter(({id}) => id !== Number(contactId))
  await rewriteFile(contacts)
}

function addContact(name, email, phone) {
  const contacts = listContacts()

  const contact = {
    id: contacts[contacts.length - 1].id + 1,
    name,
    email,
    phone
  }

  rewriteFile([...contacts, contact])
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}