import {
  Bot,
  ChartLine,
  CheckCircle2,
  Clock3,
  Code2,
  FileSearch,
  Globe,
  HardDrive,
  Layers,
  Lock,
  Megaphone,
  Monitor,
  Palette,
  Search,
  Shield,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react'

export const serviceIconMap = {
  bot: Bot,
  chart: ChartLine,
  checkCircle: CheckCircle2,
  clock: Clock3,
  code: Code2,
  fileSearch: FileSearch,
  globe: Globe,
  hardDrive: HardDrive,
  layers: Layers,
  lock: Lock,
  megaphone: Megaphone,
  monitor: Monitor,
  palette: Palette,
  search: Search,
  shield: Shield,
  sparkles: Sparkles,
  target: Target,
  users: Users,
  workflow: Workflow,
  zap: Zap,
} as const

export type ServiceIconKey = keyof typeof serviceIconMap

export const serviceIconKeys = Object.keys(serviceIconMap) as ServiceIconKey[]

export const resolveServiceIcon = (key?: string | null): LucideIcon => {
  if (key && key in serviceIconMap) {
    return serviceIconMap[key as ServiceIconKey]
  }
  return Sparkles
}
