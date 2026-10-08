import React, { useMemo, useState } from 'react';

type Node = {
  id: string;
  type: 'text' | 'input' | 'button' | 'card' | 'divider' | 'badge';
  props: Record<string, string>;
};

const initialNodes: Node[] = [
  { id: 'title', type: 'text', props: { text: 'Pay with PayUI', size: 'xl', weight: 'bold' } },
  { id: 'subtitle', type: 'text', props: { text: 'A reusable payment surface rendered from a component schema.', size: 'sm', tone: 'muted' } },
  { id: 'card', type: 'card', props: { title: 'Amazon Pay balance', value: '₹2,450.00', meta: 'Available balance' } },
  { id: 'amount', type: 'text', props: { text: 'Payment amount', size: 'sm', weight: 'semibold' } },
  { id: 'input', type: 'input', props: { label: 'Amount', value: '₹799.00', placeholder: 'Enter amount' } },
  { id: 'status', type: 'badge', props: { text: 'Secure checkout', tone: 'success' } },
  { id: 'pay', type: 'button', props: { text: 'Pay ₹799.00', variant: 'primary' } },
];

const presets: Record<string, Node[]> = {
  checkout: initialNodes,
  wallet: [
    { id: 'w1', type: 'text', props: { text: 'Wallet overview', size: 'xl', weight: 'bold' } },
    { id: 'w2', type: 'card', props: { title: 'Available balance', value: '₹2,450.00', meta: 'Updated just now' } },
    { id: 'w3', type: 'divider', props: {} },
    { id: 'w4', type: 'badge', props: { text: 'Verified account', tone: 'success' } },
    { id: 'w5', type: 'button', props: { text: 'Add money', variant: 'primary' } },
  ],
  error: [
    { id: 'e1', type: 'text', props: { text: 'Payment failed', size: 'xl', weight: 'bold' } },
    { id: 'e2', type: 'text', props: { text: 'We could not complete this payment. Try another method.', size: 'sm', tone: 'muted' } },
    { id: 'e3', type: 'badge', props: { text: 'Action required', tone: 'error' } },
    { id: 'e4', type: 'button', props: { text: 'Try again', variant: 'primary' } },
  ],
};

const tokens = [
  ['color.primary', '#146EB4'],
  ['color.surface', '#FFFFFF'],
  ['color.text', '#172033'],
  ['radius.md', '12px'],
  ['space.4', '16px'],
  ['font.body', 'Inter'],
];

function ComponentRenderer({ node }: { node: Node }) {
  switch (node.type) {
    case 'text':
      return <div className={`${node.props.size === 'xl' ? 'text-2xl' : 'text-sm'} ${node.props.weight === 'bold' ? 'font-bold' : node.props.weight === 'semibold' ? 'font-semibold' : ''} ${node.props.tone === 'muted' ? 'text-slate-500' : 'text-slate-900'}`}>{node.props.text}</div>;
    case 'input':
      return <label className="block"><span className="mb-2 block text-xs font-semibold text-slate-600">{node.props.label}</span><input value={node.props.value} readOnly placeholder={node.props.placeholder} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none ring-blue-500 focus:ring-2" /></label>;
    case 'card':
      return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs text-slate-500">{node.props.title}</div><div className="mt-1 text-xl font-bold text-slate-900">{node.props.value}</div><div className="mt-1 text-xs text-slate-500">{node.props.meta}</div></div>;
    case 'badge':
      return <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${node.props.tone === 'error' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>{node.props.text}</span>;
    case 'divider':
      return <div className="h-px w-full bg-slate-200" />;
    case 'button':
      return <span className={`block w-full rounded-xl px-4 py-3 text-center text-sm font-bold transition hover:-translate-y-0.5 ${node.props.variant === 'primary' ? 'bg-[#146EB4] text-white shadow-lg shadow-blue-900/10' : 'border border-slate-300 bg-white text-slate-800'}`}>{node.props.text}</span>;
  }
}

export const PayUIShowcase: React.FC = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [selected, setSelected] = useState('pay');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [tab, setTab] = useState<'canvas' | 'schema'>('canvas');

  const selectedNode = useMemo(() => nodes.find(n => n.id === selected), [nodes, selected]);

  const applyPreset = (name: string) => {
    const next = presets[name];
    setNodes(next);
    setSelected(next[next.length - 1].id);
  };

  const addComponent = (type: Node['type']) => {
    const id = `${type}-${Date.now()}`;
    const defaults: Record<Node['type'], Record<string, string>> = {
      text: { text: 'New component', size: 'sm' },
      input: { label: 'New field', value: '', placeholder: 'Enter value' },
      button: { text: 'Continue', variant: 'primary' },
      card: { title: 'New card', value: '₹0.00', meta: 'Component instance' },
      divider: {},
      badge: { text: 'Ready', tone: 'success' },
    };
    setNodes(current => [...current, { id, type, props: defaults[type] }]);
    setSelected(id);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div><div className="text-xs font-bold uppercase tracking-[0.18em] text-[#146EB4]">PayUI Rendering Lab</div><h1 className="mt-1 text-xl font-bold">Reusable customer experience platform</h1></div>
          <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">Prototype • v0.1</div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 lg:grid-cols-[220px_minmax(0,1fr)_270px]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Component library</div>
          <div className="space-y-2">{(['text','input','button','card','badge','divider'] as Node['type'][]).map(type => <button key={type} onClick={() => addComponent(type)} className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5 text-left text-sm hover:border-blue-300 hover:bg-blue-50"><span className="font-medium capitalize">{type}</span><span className="text-slate-400">+</span></button>)}</div>
          <div className="mb-3 mt-7 text-xs font-bold uppercase tracking-wider text-slate-400">Scenarios</div>
          <div className="space-y-2">{['checkout','wallet','error'].map(name => <button key={name} onClick={() => applyPreset(name)} className="w-full rounded-xl px-3 py-2 text-left text-sm capitalize text-slate-600 hover:bg-slate-100">{name}</button>)}</div>
          <div className="mt-7 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500"><b className="text-slate-700">Architecture</b><br/>Schema → renderer → reusable components → client surface</div>
        </aside>

        <main className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
              <button onClick={() => setTab('canvas')} className={`rounded-md px-3 py-1.5 text-xs font-semibold ${tab === 'canvas' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Live canvas</button>
              <button onClick={() => setTab('schema')} className={`rounded-md px-3 py-1.5 text-xs font-semibold ${tab === 'schema' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Schema</button>
            </div>
            <div className="flex gap-1">{(['desktop','mobile'] as const).map(d => <button key={d} onClick={() => setDevice(d)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${device === d ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>{d}</button>)}</div>
          </div>

          {tab === 'canvas' ? <div className="min-h-[650px] bg-[#eef2f6] p-6">
            <div className={`mx-auto overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all ${device === 'mobile' ? 'max-w-[390px]' : 'max-w-3xl'}`}>
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3"><div className="text-sm font-bold">PayUI Checkout</div><span className="text-xs text-slate-400">component renderer</span></div>
              <div className="space-y-4 p-6">{nodes.map(node => <div key={node.id} onClick={() => setSelected(node.id)} className={`cursor-pointer rounded-xl text-left transition ${selected === node.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}><ComponentRenderer node={node} /></div>)}</div>
            </div>
          </div> : <pre className="min-h-[650px] overflow-auto bg-[#0f172a] p-6 text-xs leading-6 text-slate-200">{JSON.stringify({ version: '0.1', surface: 'checkout', components: nodes }, null, 2)}</pre>}
        </main>

        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Inspector</div>
          {selectedNode ? <div className="space-y-4">
            <div><div className="text-xs text-slate-400">Selected component</div><div className="mt-1 text-lg font-bold capitalize">{selectedNode.type}</div><div className="mt-1 font-mono text-[11px] text-slate-400">{selectedNode.id}</div></div>
            <div className="space-y-3">{Object.entries(selectedNode.props).map(([key, value]) => <label key={key} className="block"><span className="mb-1 block text-[11px] font-semibold text-slate-500">{key}</span><input value={value} onChange={e => setNodes(current => current.map(n => n.id === selectedNode.id ? { ...n, props: { ...n.props, [key]: e.target.value } } : n))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-400" /></label>)}</div>
            <button onClick={() => setNodes(current => current.filter(n => n.id !== selectedNode.id))} className="w-full rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">Remove component</button>
          </div> : <div className="text-sm text-slate-500">Select a component in the canvas.</div>}

          <div className="mt-8 border-t border-slate-100 pt-5"><div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Design tokens</div><div className="space-y-2">{tokens.map(([name, value]) => <div key={name} className="flex items-center justify-between gap-3 text-xs"><span className="font-mono text-slate-500">{name}</span><span className="font-semibold text-slate-700">{value}</span></div>)}</div></div>
        </aside>
      </div>

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-2"><div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="text-xs font-bold uppercase tracking-wider text-blue-600">01 • Define</div><h2 className="mt-2 font-bold">One schema, many surfaces</h2><p className="mt-2 text-sm leading-6 text-slate-500">Product teams describe experiences as a versioned component schema instead of rebuilding UI for every payment page.</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="text-xs font-bold uppercase tracking-wider text-blue-600">02 • Render</div><h2 className="mt-2 font-bold">Standardized components</h2><p className="mt-2 text-sm leading-6 text-slate-500">The renderer maps schema nodes to tested components with shared tokens, states, accessibility and responsive behavior.</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="text-xs font-bold uppercase tracking-wider text-blue-600">03 • Scale</div><h2 className="mt-2 font-bold">Clients consume the platform</h2><p className="mt-2 text-sm leading-6 text-slate-500">Multiple customer journeys can reuse the same primitives while product teams evolve experiences independently.</p></div>
      </div></section>
    </div>
  );
};
