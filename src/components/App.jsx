import { Component } from 'react';
import { Notification } from 'components/Notification/Notification';
import { Section } from 'components/Section/Section';
import { Statistics } from 'components/Statistics/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  addVote = option => {
    this.setState({ [option]: this.state[option] + 1 });
  };

  countTotalFeedback = () => {
    const values = Object.values(this.state);
    let total = 0;
    for (const value of values) {
      total += value;
    }
    return total;
  };

  countPositiveFeedbackPercentage = (good, neutral, total) => {
    let positivePercentage;

    total === 0
      ? (positivePercentage = 0)
      : (positivePercentage = Math.round(((good + neutral) / total) * 100));

    return positivePercentage;
  };

  render() {
    const { good, neutral, bad } = this.state;

    let total = this.countTotalFeedback();

    let positivePercentage = this.countPositiveFeedbackPercentage(
      good,
      neutral,
      total
    );

    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.state}
            onLeaveFeedback={this.addVote}
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
}

//  <div>
//   <h1>Please leave feedback</h1>

//   <div>
//     <button type="button" id="good" onClick={() => this.addVote('good')}>
//       Good
//     </button>
//     <button
//       type="button"
//       id="neutral"
//       onClick={() => this.addVote('neutral')}
//     >
//       Neutral
//     </button>
//     <button type="button" id="bad" onClick={() => this.addVote('bad')}>
//       Bad
//     </button>
//   </div>

//   <h2>Statistics</h2>

//   <ul>
//     <li>Good: {good}</li>
//     <li>Neutral: {neutral}</li>
//     <li>Bad: {bad}</li>
//     <li>Total: {total}</li>
//     <li>Positive feedback: {positivePercentage}%</li>
//   </ul>
// </div>
