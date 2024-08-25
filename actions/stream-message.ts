'use server'

import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'

export interface ChatMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
}

export interface Chat {
  id: string
  name: string
  messages: ChatMessage[]
}

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict', // strict mode for OpenAI API
  baseURL: 'https://api.openai.com/v1',
  project: process.env.OPENAI_PROJECT,
  organization: process.env.OPENAI_ORGANIZATION
})

export async function streamMessage(messages: ChatMessage[]) {
  const stream = createStreamableValue('')

  ;(async () => {
    const { textStream } = await streamText({
      model: openai('gpt-4o-mini'),
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...messages.map(({ role, content }) => ({ role, content }))
      ]
    })

    for await (const delta of textStream) {
      stream.update(delta)
    }

    stream.done()
  })()

  return { output: stream.value }
}
