'use client';
import { useState, useRef, useEffect } from 'react';

interface CodeEditorProps {
    value: string;
    onChange: (code: string) => void;
    language: string;
    readOnly?: boolean;
}

export default function CodeEditor({ value, onChange, language, readOnly = false }: CodeEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineCount = value.split('\n').length;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const target = e.target as HTMLTextAreaElement;
            const start = target.selectionStart;
            const end = target.selectionEnd;
            const newValue = value.substring(0, start) + '  ' + value.substring(end);
            onChange(newValue);
            setTimeout(() => { target.selectionStart = target.selectionEnd = start + 2; }, 0);
        }
    };

    return (
        <div className="code-editor">
            <div className="code-editor-header">
                <span className="code-editor-lang">{language}</span>
                {readOnly && <span className="code-editor-readonly">READ ONLY</span>}
            </div>
            <div className="code-editor-body">
                <div className="code-editor-lines">
                    {Array.from({ length: lineCount }, (_, i) => (
                        <div key={i} className="code-editor-line-num">{i + 1}</div>
                    ))}
                </div>
                <textarea
                    ref={textareaRef}
                    className="code-editor-textarea"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    readOnly={readOnly}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                />
            </div>
        </div>
    );
}
