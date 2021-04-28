const { listContacts, getContactById, removeContact, addContact } = require('./contacts.js')

const { Command } = require('commander')
const program = new Command()
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.log(await listContacts())
      break

    case 'get':
      const contacts = await listContacts()
      const contact = contacts.find(contact => contact.id.toString() === id)  
      console.log(contact)
      break

    case 'add':
      await addContact(name, email, phone)
      console.log(await listContacts())
      break

    case 'remove':
      await removeContact(id)
      console.log(await listContacts())
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)