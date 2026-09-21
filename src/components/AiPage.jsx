"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Download, FileCode2, Folder, FolderTree } from "lucide-react";
import { createZip } from "../lib/zip";

function buildInstructionTree(files) {
  return files.reduce(
    (root, file) => {
      const parts = file.path.split("/").slice(1);
      let current = root;

      parts.forEach((part, index) => {
        let child = current.children.find((node) => node.name === part);

        if (!child) {
          child = { name: part, children: [], file: index === parts.length - 1 ? file : null };
          current.children.push(child);
        }

        current = child;
      });

      return root;
    },
    { name: "ai", children: [], file: null },
  );
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AiPage({ files }) {
  const [selectedInstruction, setSelectedInstruction] = useState(null);
  const tree = useMemo(() => buildInstructionTree(files), [files]);

  if (!selectedInstruction) {
    return (
      <section className="ai-page" aria-labelledby="ai-title">
        <header className="ai-heading">
          <div>
            <h2 id="ai-title">AI 지침 지도</h2>
            <p>프로젝트 작업에 사용할 AI 지침을 <code>.claude/</code>에 분류해 정리합니다.</p>
          </div>
          <button
            className="ai-download"
            type="button"
            onClick={() => downloadBlob(createZip(files), "ai-instructions.zip")}
          >
            <Download aria-hidden="true" size={17} />
            AI 지침 다운로드
          </button>
        </header>
        <div className="ai-map" aria-label="Claude 작업 지침 마인드맵">
          <div className="map-toolbar">
            <span className="map-toolbar-path">BLOG <b>/</b> .claude</span>
            <span className="map-toolbar-status">CLAUDE</span>
          </div>
          <div className="map-tree">
            {tree.children.map((node) => (
              <InstructionTree key={node.name} node={node} onOpenFile={setSelectedInstruction} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ai-page ai-page-detail" aria-labelledby="ai-title">
      <header className="ai-heading">
        <div>
          <h2 id="ai-title">{selectedInstruction.path}</h2>
          <p>AI 지침 지도와 다운로드 ZIP에 동일하게 포함되는 원본 파일입니다.</p>
        </div>
        <button
          className="ai-download"
          type="button"
          onClick={() =>
            downloadBlob(
              new Blob([selectedInstruction.content], { type: "text/plain;charset=utf-8" }),
              selectedInstruction.path.split("/").at(-1),
            )
          }
        >
          파일 다운로드
        </button>
      </header>
      <div className="ai-guides">
        <section className="ai-guide" aria-label="Claude 작업 지침">
          <pre>{selectedInstruction.content}</pre>
        </section>
      </div>
      <nav className="post-navigation" aria-label="AI 지침 탐색" data-next="false" data-previous="false">
        <button className="post-navigation-list" type="button" onClick={() => setSelectedInstruction(null)}>
          목록으로
        </button>
      </nav>
    </section>
  );
}

function InstructionTree({ node, onOpenFile }) {
  const [isOpen, setIsOpen] = useState(node.name === "ai");
  const isFile = Boolean(node.file);

  if (isFile) {
    return (
      <button className="map-file" type="button" onClick={() => onOpenFile(node.file)}>
        <FileCode2 aria-hidden="true" size={17} />
        <span>{node.name}</span>
      </button>
    );
  }

  const FolderIcon = node.name === ".claude" ? FolderTree : Folder;

  return (
    <div className="map-folder">
      <button aria-expanded={isOpen} className="map-folder-head" type="button" onClick={() => setIsOpen((open) => !open)}>
        <FolderIcon aria-hidden="true" size={node.name === "ai" ? 24 : 20} />
        <span>{node.name}</span>
        <ChevronDown aria-hidden="true" className={isOpen ? "map-chevron is-open" : "map-chevron"} size={18} />
      </button>
      <div className={isOpen ? "map-children is-open" : "map-children"}>
        <div>
          {node.children.map((child) => (
            <InstructionTree key={child.name} node={child} onOpenFile={onOpenFile} />
          ))}
        </div>
      </div>
    </div>
  );
}
