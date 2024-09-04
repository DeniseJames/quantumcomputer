import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import React, { useState } from 'react';
import gql from 'graphql-tag';
import awsconfig from '../../../src/aws-exports';

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: awsconfig.aws_appsync_apiKey,
  },
});

const createContact = gql`
  mutation CreateContact($input: CreateContactInput!) {
    createContact(input: $input) {
      id
      name
      email
      comments
    }
  }
`;

const ContactComponent: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      comments,
    };

    try {
      const response = await client.mutate({
        mutation: createContact,
        variables: { input: formData },
      });
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Comments"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactComponent;
