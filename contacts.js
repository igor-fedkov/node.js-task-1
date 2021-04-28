const fs = require('fs').promises
const path = require('path')
const shortId = require('shortid');

const contactsPath = path.resolve('db/contacts.json')


const onErr = err => {
  console.log(err)
  process.exit(1)
}

// TODO: задокументировать каждую функцию
async function listContacts() {
  // console.log(contactsPath)
  try {    
    const data = await fs.readFile(contactsPath)
    // console.log(JSON.parse(data))
    return JSON.parse(data)
  } catch (err) {
    onErr(err)
  }
}

listContacts()

async function getContactById(contactId) {
  const contacts = await listContacts()
  return contacts.find(({id}) => id === Number(contactId))
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts()
    const newList = contacts.filter(({ id }) => id !== Number(contactId))
    await fs.writeFile(contactsPath, JSON.stringify(newList))
  } catch (err) {
    onErr(err)
  }  
}

async function addContact(name, email, phone) {
  const contacts = await listContacts()

  const contact = {
    id: shortId(),
    name,
    email,
    phone
  }

  await fs.writeFile(contactsPath, JSON.stringify([...contacts, contact]))
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}