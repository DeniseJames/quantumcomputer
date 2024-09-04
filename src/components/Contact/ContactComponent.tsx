import React, { useState } from 'react';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
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

const createContactMutation = gql`
  mutation CreateContact($email: String!, $name: String!, $comment: String!) {
    createContact(input: { email: $email, name: $name, comment: $comment }) {
      id
      email
      name
      comment
    }
  }
`;

const ContactComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { email, name, comment };

    try {
      const result = await client.mutate({
        mutation: createContactMutation,
        variables: data,
      });
      console.log('Form submitted successfully:', result);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Comment:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactComponent;
