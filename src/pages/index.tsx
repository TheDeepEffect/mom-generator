import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { MouseEventHandler, useState } from 'react'
import { remark } from 'remark'
import html from 'remark-html'
import Footer from '@/components/Footer'

export default function Home() {
  const [transcript, setTranscript] = useState('')
  const [loading, setLoading] = useState(false);
  const [generatedMom, setGeneratedMom] = useState('');

  const prompt = `Generate minutes of meetings(MoM) in html format. Make sure it covers all action items and base it on this transcript: ${transcript}`;

  const generateMom: MouseEventHandler<HTMLButtonElement> | undefined = async (e) => {
    e.preventDefault();
    setGeneratedMom('');
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        // Use remark to convert markdown into HTML string
        // const processedContent = await remark()
        //   .use(html)
        //   .process(chunkValue);
        // const contentHtml = processedContent.toString();
        setGeneratedMom((state) => {
          return state + chunkValue
        });
      }

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Head>
        <title>Minutes of Meeting generator</title>
        <meta name="description" content="Minutes of meeting Generated with Open AI's API for  GPT3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainWrapper}>
        <div className={styles.main}>
          <div className={styles.addPrompt}>
            <textarea
              placeholder='Enter transcript here'
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
            />
          </div>
          <div className={styles.results}>
            <button
              onClick={generateMom}
              disabled={transcript.trim().length < 200 || loading}
            >
              {transcript.trim().length < 200 ? 'Transcript should be more than 200 characters' : loading ? 'Loading...' : 'Click here to generate'}
            </button>
            <section dangerouslySetInnerHTML={{ __html: generatedMom }}>
              {/* {generatedMom} */}
            </section>

          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
