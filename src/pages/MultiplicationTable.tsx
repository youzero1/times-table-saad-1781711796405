import { useState } from 'react';
import clsx from 'clsx';
import { Hash } from 'lucide-react';

const MULTIPLIER = 2;
const MAX_DEFAULT = 12;

export default function MultiplicationTable() {
  const [maxValue, setMaxValue] = useState<number>(MAX_DEFAULT);
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);

  const rows: number[] = Array.from({ length: maxValue }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl shadow-lg mb-4">
            <Hash className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Multiplication Table
          </h1>
          <p className="text-green-600 font-semibold text-lg mt-1">
            of {MULTIPLIER}
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex items-center gap-4">
          <label className="text-sm font-medium text-gray-600 whitespace-nowrap">
            Show up to:
          </label>
          <input
            type="range"
            min={1}
            max={20}
            value={maxValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMaxValue(Number(e.target.value))
            }
            className="flex-1 accent-green-500"
          />
          <span className="text-green-600 font-bold text-lg w-8 text-center">
            {maxValue}
          </span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-green-500 px-6 py-3 flex items-center justify-between">
            <span className="text-white font-bold text-base">Expression</span>
            <span className="text-white font-bold text-base">Result</span>
          </div>

          <ul className="divide-y divide-gray-100">
            {rows.map((n: number) => (
              <li
                key={n}
                onMouseEnter={() => setHighlightedRow(n)}
                onMouseLeave={() => setHighlightedRow(null)}
                className={clsx(
                  'flex items-center justify-between px-6 py-3 transition-colors duration-150 cursor-default',
                  highlightedRow === n
                    ? 'bg-green-50'
                    : n % 2 === 0
                    ? 'bg-gray-50'
                    : 'bg-white'
                )}
              >
                <span
                  className={clsx(
                    'text-base font-medium',
                    highlightedRow === n ? 'text-green-700' : 'text-gray-700'
                  )}
                >
                  {MULTIPLIER} &times; {n}
                </span>
                <span
                  className={clsx(
                    'text-base font-bold',
                    highlightedRow === n ? 'text-green-600' : 'text-gray-800'
                  )}
                >
                  = {MULTIPLIER * n}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Hover over a row to highlight it. Drag the slider to see more entries.
        </p>
      </div>
    </div>
  );
}
