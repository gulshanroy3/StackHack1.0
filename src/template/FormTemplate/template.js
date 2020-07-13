export const registrationTemplate = [
    {
        "label": "Full Name",
        "name": 'name',
        "uIElement": "input",
        "type": "text",
        "required": true
    },
    {
        "label": "Mobile Number",
        "name": 'mobile',
        "uIElement": "input",
        "type": "number",
        "required": true,
        min: 1
    },
    {
        "label": "Email",
        "name": 'email',
        "uIElement": "input",
        "type": "email",
        "required": true
    },
    {
        "label": "Upload ID Card",
        "name": 'avatar',
        "uIElement": "input",
        "type": "file",
        "required": true
    },
    {
        "label": "Registration Type",
        name: 'regType',
        "uIElement": "select",
        fieldOptions: [{ "label": 'Self', value: 'self', id: 0 },
        { "label": 'Group', value: 'group', id: 1 }, { "label": 'Corporate', value: 'corporate', id: 2 }, { "label": 'Others', value: 'others', id: 3 }],
        "type": "text",
        "required": true
    }, {
        "label": "No. of Tickets",
        name: 'tickets',
        "uIElement": "input",
        "type": "number",
        "required": true,
        min: 1
    }
]