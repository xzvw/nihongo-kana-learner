import { useMemo, useState } from 'react'
import { hiraganaSeion } from './constants'
import styles from './App.module.scss'
import img0 from './assets/0.webp'
import img1 from './assets/1.webp'
import img2 from './assets/2.webp'
import img3 from './assets/3.webp'
import img4 from './assets/4.webp'

const randomImage = () => {
  const imgList = [img0, img1, img2, img3, img4]
  return imgList[Math.floor(Math.random() * imgList.length)]
}

const getNewHiraganaSeion = () => {
  const index = Math.floor(Math.random() * hiraganaSeion.length)
  return hiraganaSeion[index]
}

function shuffleArray<T>(array: Array<T>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

const pickAnswerOptions = (currentHiraganaSeion: [string, string]) => {
  const result = [currentHiraganaSeion]

  let filteredHiraganaSeion = hiraganaSeion.filter(
    (value) => value[0] !== currentHiraganaSeion[0]
  )

  for (let i = 1; i < 4; i++) {
    const index = Math.floor(Math.random() * filteredHiraganaSeion.length)
    const answerOption = filteredHiraganaSeion[index]

    result.push(answerOption)

    filteredHiraganaSeion = filteredHiraganaSeion.filter(
      (value) => value[0] !== answerOption[0]
    )
  }

  return shuffleArray(result)
}

function App() {
  const [currentHiraganaSeion, setCurrentHiraganaSeion] =
    useState(getNewHiraganaSeion)

  const pickedAnswerOptions = useMemo(
    () => pickAnswerOptions(currentHiraganaSeion),
    [currentHiraganaSeion]
  )

  const [selectedAnswerOption, setSelectedAnswerOption] = useState<
    [string, string] | null
  >(null)

  const onAnswerOptionClick = (answerOption: [string, string]) => {
    setSelectedAnswerOption(answerOption)
  }

  const isAnswerCorrect = useMemo(() => {
    if (!selectedAnswerOption) {
      return null
    }

    return selectedAnswerOption[1] === currentHiraganaSeion[1]
  }, [currentHiraganaSeion, selectedAnswerOption])

  return (
    <div className={styles.container}>
      <div className={styles.current}>{currentHiraganaSeion[0]}</div>
      <div className={styles.answerOptions}>
        {pickedAnswerOptions.map((answerOption) => (
          <div
            key={answerOption[1]}
            className={styles.answerOption}
            onClick={() => {
              if (isAnswerCorrect === null) {
                onAnswerOptionClick(answerOption)
              }
            }}
            style={{
              ...(selectedAnswerOption &&
              selectedAnswerOption[1] === answerOption[1]
                ? { backgroundColor: '#93c5fd' }
                : {}),
            }}
          >
            {answerOption[1]}
          </div>
        ))}
      </div>

      {isAnswerCorrect === true && (
        <div
          className={styles.result}
          onClick={() => {
            setCurrentHiraganaSeion(getNewHiraganaSeion())
            setSelectedAnswerOption(null)
          }}
        >
          答對了！{currentHiraganaSeion[0]} 唸作 {currentHiraganaSeion[1]}
          <br />
          前往下一題
          <br />
          <img src={randomImage()} style={{ maxWidth: '80vw' }} />
        </div>
      )}
      {isAnswerCorrect === false && (
        <div
          className={styles.result}
          onClick={() => {
            setCurrentHiraganaSeion(getNewHiraganaSeion())
            setSelectedAnswerOption(null)
          }}
        >
          答錯了，{currentHiraganaSeion[0]} 唸作 {currentHiraganaSeion[1]}
          <br />
          前往下一題
          <br />
          <img src={randomImage()} style={{ maxWidth: '80vw' }} />
        </div>
      )}
    </div>
  )
}

export default App
