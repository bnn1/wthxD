import axios from "axios";
import { useEffect, useState } from "react"
import { from, interval, of } from "rxjs";
import { delay, map, mergeMap, scan, take } from "rxjs/operators";

const song = ['hey I just met you', 'and this is crazy', 'but mozhet shodim kuda-nibud\'?))))))']

const IndexPage = () => {
  const [words, setWords] = useState([] as string[]);
  const [buttons, setButtons] = useState([] as string[]);
  const [voted, setVoted] = useState(false);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    from(song).pipe(
      mergeMap(() => interval(1500).pipe(
        take(song.length),
        map(x => song[x])
      ))
    ).subscribe({
      next: x => setWords([...words, x]),
      complete: () => {
        const buttons = ['nu mozhno))))))', 'ne))))))']
        setTimeout(() => setButtons(buttons), 2500)
      }
    })
  }, []);

  const submit = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const { value } = evt.currentTarget;
    setVoted(true);
    setAnswer(value);
    await axios.post('/api/sendvote', { answer: value });
  }

  return <div>
    {!(buttons.length > 0) && words.map((word, idx) => <p key={idx}>{word}</p>)}
    {!voted && buttons.length > 0 && buttons.map((btn, idx) => <button onClick={submit} value={btn} key={idx}>{btn}</button>)}
    {voted ? answer.includes('nu') ? <p>)))))))))))</p> : <p>((((((((((</p> : null}
  </div>
}

export default IndexPage
