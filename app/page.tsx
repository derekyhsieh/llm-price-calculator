"use client"

import React, { useState } from 'react';

interface Model {
  name: string;
  inputPrice: number;
  outputPrice: number;
}

const models: Model[] = [
  { name: 'claude-opus', inputPrice: 15, outputPrice: 75 },
  { name: 'gpt-4-turbo', inputPrice: 10, outputPrice: 30 },
  { name: 'gpt-3.5-turbo-0125', inputPrice: 0.5, outputPrice: 1.5 },
  { name: 'claude-haiku', inputPrice: 0.25, outputPrice: 1.25 },
  { name: 'claude-sonnet', inputPrice: 3, outputPrice: 15 },
];

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<Model>(models[0]);
  const [inputTokens, setInputTokens] = useState<string>('');
  const [outputTokens, setOutputTokens] = useState<string>('');

  const calculatePrice = (): number => {
    const inputPrice = (selectedModel.inputPrice / 1000000) * (Number(inputTokens) || 0);
    const outputPrice = (selectedModel.outputPrice / 1000000) * (Number(outputTokens) || 0);
    return inputPrice + outputPrice;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Token Price Calculator</h1>
        <div className="mb-4">
          <label htmlFor="model-select" className="block mb-2 font-semibold">
            Select Model:
          </label>
          <select
            id="model-select"
            value={selectedModel.name}
            onChange={(e) =>
              setSelectedModel(models.find((model) => model.name === e.target.value)!)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {models.map((model) => (
              <option key={model.name} value={model.name}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="input-tokens" className="block mb-2 font-semibold">
            Input Tokens:
          </label>
          <input
            id="input-tokens"
            type="text"
            value={inputTokens}
            onChange={(e) => setInputTokens(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="output-tokens" className="block mb-2 font-semibold">
            Output Tokens:
          </label>
          <input
            id="output-tokens"
            type="text"
            value={outputTokens}
            onChange={(e) => setOutputTokens(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="text-xl font-semibold text-center">
          Price: ${calculatePrice().toFixed(2)}
        </p>
      </div>
    </div>
  );
}