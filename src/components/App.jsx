import { useState } from 'react';
import { Notification } from 'components/Notification/Notification';
import { Section } from 'components/Section/Section';
import { Statistics } from 'components/Statistics/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleChange = option => {
    switch (option) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        return;
    }
  };

  let options = {};
  options.good = good;
  options.bad = bad;
  options.neutral = neutral;

  const countTotalFeedback = () => {
    const values = Object.values(options);
    let total = 0;
    for (const value of values) {
      total += value;
    }
    return total;
  };

  const countPositiveFeedback = (good, neutral, total) => {
    let positivePercentage;

    total === 0
      ? (positivePercentage = 0)
      : (positivePercentage = Math.round(((good + neutral) / total) * 100));

    return positivePercentage;
  };

  let total = countTotalFeedback();
  let positivePercentage = countPositiveFeedback(good, neutral, total);

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={handleChange}
        ></FeedbackOptions>

        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback yet"></Notification>
        )}
      </Section>
    </div>
  );
}

// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   addVote = option => {
//     this.setState({ [option]: this.state[option] + 1 });
//   };

//   countTotalFeedback = () => {
//     const values = Object.values(this.state);
//     let total = 0;
//     for (const value of values) {
//       total += value;
//     }
//     return total;
//   };

//   countPositiveFeedbackPercentage = (good, neutral, total) => {
//     let positivePercentage;

//     total === 0
//       ? (positivePercentage = 0)
//       : (positivePercentage = Math.round(((good + neutral) / total) * 100));

//     return positivePercentage;
//   };

//   render() {
//     const { good, neutral, bad } = this.state;

//     let total = this.countTotalFeedback();

//     let positivePercentage = this.countPositiveFeedbackPercentage(
//       good,
//       neutral,
//       total
//     );

//     return (
//       <div>
//         <Section title="Please leave feedback">
//           <FeedbackOptions
//             options={this.state}
//             onLeaveFeedback={this.addVote}
//           ></FeedbackOptions>

//           {total > 0 ? (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={total}
//               positivePercentage={positivePercentage}
//             ></Statistics>
//           ) : (
//             <Notification message="There is no feedback yet"></Notification>
//           )}
//         </Section>
//       </div>
//     );
//   }
// }
