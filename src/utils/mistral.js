import MistralClient from "./mistralai.js";

const apiKey = "RO0bojds8YfNol2aq6C48HQ524FOeCRW";

const client = new MistralClient(apiKey);

export const parseResponse = response =>
  response.match(/(\{[^{}]+\})/g).map(JSON.parse);

export const searchMistral = async query => {
  const response = await client.chat({
    model: "open-mistral-7b",
    messages: [
      {
        role: "system",
        content:
          "Always provide the result in JSON format with title, author and description"
      },
      {
        role: "system",
        content: "Always provide the results as an array of JSON objects"
      },
      {
        role: "system",
        content:
          "Only provide answers related to books, otherwise answer 'Not found'"
      },
      {
        role: "system",
        content: "Each object should be a single book"
      },
      {
        role: "system",
        content: "Always try and provide at least 8 answers"
      },
      {
        role: "system",
        content: "Try and rank the books in order of popularity"
      },
      {
        role: "system",
        content: "Each result must have a different title"
      },
      {
        role: "system",
        content:
          "Books should not be in the same series unless specifically requested"
      },
      {
        role: "system",
        content: "Each result must be an existing book"
      },
      {
        role: "system",
        content: "Avoid books with non-latin characters in their title"
      },
      {
        role: "user",
        content: query
      }
    ]
  });

  return response.choices[0].message.content;
};
