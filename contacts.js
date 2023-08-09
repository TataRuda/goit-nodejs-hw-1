const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
  }
  
const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);

    return result || null
  };
  
const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);
    if (contactIndex === -1) {
        return null
    }
    const [removedContact] = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

    return removedContact;
  };
  
const addContact = async(name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: Date.now(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)) 
    return newContact; 
  };

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  };

