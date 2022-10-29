import React, { useEffect } from 'react';
import '../styles/Result.css';
import { Link } from 'react-router-dom';

import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import {
  attempts_Number,
  earnPoints_Number,
  flagResult,
} from '../helper/helper';

/** import actions  */
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';

import { usePublishResult } from '../hooks/setResult';

export default function Result() {
  const dispatch = useDispatch();

  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);

  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);

  console.log({
    result,
    username: userId,
    attempts,
    points: earnPoints_Number,
    achived: flag ? 'passed' : 'fail',
  });

  useEffect(() => {
    console.log(earnPoints);
  });

  /** store user result */
  usePublishResult({
    result,
    username: userId,
    attempts,
    points: earnPoints,
    achived: flag ? 'Passed' : 'Failed',
  });

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className="container">
      <h1 className="title text-light">Exam Application</h1>

      <div className="result flex-center">
        <div className="flex">
          <span>
            Name: <br />
          </span>
          <span className="bold">{userId}</span>
        </div>
        <div className="flex">
          <span>Total Score : </span>
          <span className="bold">{totalPoints || 0}</span>
        </div>
        <div className="flex">
          <span>All Questions : </span>
          <span className="bold">{queue.length || 0}</span>
        </div>
        <div className="flex">
          <span>Attempts : </span>
          <span className="bold">{attempts || 0}</span>
        </div>
        <div className="flex">
          <span>Exam Score : </span>
          <span className="bold">{earnPoints || 0}</span>
        </div>
        <div className="flex">
          <span>Result:</span>
          <span
            style={{ color: `${flag ? '#4db5ff' : 'crimson'}` }}
            className="bold"
          >
            {flag ? 'Passed' : 'Failed'}
          </span>
        </div>
      </div>

      <div className="start">
        <Link className="btn" to={'/'} onClick={onRestart}>
          Restart
        </Link>
      </div>
      <br />
      <div className="containe">
        {/* result table */}
        <ResultTable></ResultTable>
      </div>
    </div>
  );
}
