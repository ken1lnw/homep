import { FlowManagerProvider } from "@/providers/flow-manager-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <FlowManagerProvider>{children}</FlowManagerProvider>;
}
