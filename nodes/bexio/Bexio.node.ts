import {INodeType, INodeTypeDescription, NodeConnectionType} from 'n8n-workflow';

export class Bexio implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Bexio',
		name: 'bexio',
		icon: 'file:bexio.svg',
		group: ['transform'],
		version: 1,
		description: 'Interact with Bexio CRM API to manage contacts and customer data',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		defaults: {
			name: 'Bexio',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'bexioApi',
				required: true,
			},
		],
		usableAsTool: true,
		requestDefaults: {
			baseURL: 'https://api.bexio.com',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Contact',
						value: 'contact',
					},
				],
				default: 'contact',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contact'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new contact',
						action: 'Creates a contact in bexio by name and optional email',
						routing: {
							request: {
								method: 'POST',
								url: '/2.0/contact',
							},
						},
					},
					{
						name: 'Search',
						value: 'search',
						action: 'Search a contact in bexio by using filter fields for name email phone',
						description: 'Search for contacts using filter fields',
						routing: {
							request: {
								method: 'POST',
								url: '/2.0/contact/search',
								body: '={{ $parameter["filters"].filter }}',
							},
						},
					},

				],
				default: 'create',
			},
			//Create contact fields
			{
				displayName: 'Name',
				name: 'name_1',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							name_1: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Email',
				name: 'mail',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							mail: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'ContactTypeId',
				name: 'contact_type_id',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							contact_type_id: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'UserId',
				name: 'user_id',
				type: 'string',
				default: '1',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							user_id: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'OwnerId',
				name: 'owner_id',
				type: 'string',
				default: '1',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							owner_id: '={{$value}}',
						},
					},
				},
			},
			//Search contact fields
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				placeholder: 'Add Filter',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['search'],
					},
				},
				options: [
					{
						name: 'filter',
						displayName: 'Filter',
						values: [
							{
								displayName: 'Field',
								name: 'field',
								type: 'options',
								options: [
									{ name: 'Name/Company Name', value: 'name_1' },
									{ name: 'Email', value: 'mail' },
									{ name: 'Phone (Phone_fixed)', value: 'phone_fixed' },
								],
								default: 'name_1',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Criteria',
								name: 'criteria',
								type: 'options',
								options: [
									{ name: '=', value: '=' },
									{ name: '!=', value: '!=' },
									{ name: 'Like', value: 'like' },
								],
								default: '=',
							},
						],
					},
				],
			}
		],
	};
}
