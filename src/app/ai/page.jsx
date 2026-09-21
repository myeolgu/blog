import AiPage from "../../components/AiPage";
import { getAiInstructionFiles } from "../../lib/ai-instructions";

export const metadata = { title: "AI" };

export default function AiRoute() {
  return (
    <section className="content-layout">
      <AiPage files={getAiInstructionFiles()} />
    </section>
  );
}
