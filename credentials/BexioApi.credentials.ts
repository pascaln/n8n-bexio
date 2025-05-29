import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BexioApi implements ICredentialType {
	name = 'bexioApi';
	displayName = 'Bexio API';
	documentationUrl = 'https://docs.bexio.com/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				alwaysOpenEditWindow: true, // makes editing large tokens easier
				password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: 'Bearer {{$credentials.apiKey}}',
			},
		},
	};
}
