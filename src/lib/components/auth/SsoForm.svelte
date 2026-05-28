<script lang="ts">
  interface Props {
    onBack: () => void;
  }

  let { onBack }: Props = $props();
  let proto = $state<'saml' | 'oidc'>('saml');
  let domain = $state('');

  function doSSO() {
    if (!domain.trim()) return;
    alert(`Redirecting ${domain} to ${proto.toUpperCase()} provider… (demo)`);
  }
</script>

<div>
  <button class="flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] bg-transparent border-none cursor-pointer mb-5 w-fit transition-colors" onclick={onBack}>
    <svg viewBox="0 0 24 24" class="w-[13px] h-[13px]"><polyline points="15 18 9 12 15 6"/></svg>
    Back
  </button>

  <h2 class="text-xl font-bold tracking-[-0.4px] mb-1">Enterprise SSO</h2>
  <p class="text-[13px] text-[var(--muted)] mb-6 leading-relaxed">Enter your organization's domain and select the protocol configured by your admin.</p>

  <div class="flex border border-[var(--border)] rounded-md overflow-hidden mb-4">
    <button
      class="flex-1 h-9 border-none text-xs font-semibold cursor-pointer transition border-r border-[var(--border)]"
      class:bg-[var(--primary)]={proto === 'saml'}
      class:text-white={proto === 'saml'}
      class:text-[var(--muted)]={proto !== 'saml'}
      class:hover:bg-[var(--bg)]={proto !== 'saml'}
      class:bg-transparent={proto !== 'saml'}
      onclick={() => proto = 'saml'}
    >
      SAML 2.0
    </button>
    <button
      class="flex-1 h-9 border-none text-xs font-semibold cursor-pointer transition"
      class:bg-[var(--primary)]={proto === 'oidc'}
      class:text-white={proto === 'oidc'}
      class:text-[var(--muted)]={proto !== 'oidc'}
      class:hover:bg-[var(--bg)]={proto !== 'oidc'}
      class:bg-transparent={proto !== 'oidc'}
      onclick={() => proto = 'oidc'}
    >
      OIDC
    </button>
  </div>

  <div class="flex flex-col gap-[5px] mb-4">
    <label class="text-[11px] font-semibold">Organization domain</label>
    <input
      type="text"
      bind:value={domain}
      placeholder="company.com"
      onkeydown={(e) => e.key === 'Enter' && doSSO()}
      class="w-full h-10 bg-[var(--bg)] border border-[var(--border)] rounded-md px-3 font-mono text-xs text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(59,130,246,.1)] focus:bg-[var(--panel)] placeholder:text-[var(--muted)] dark:bg-[#1c2128] dark:focus:bg-[var(--panel)]"
    />
    <span class="text-[11px] text-[var(--muted)] mt-1">
      {proto === 'saml' ? "We'll redirect you to your SAML identity provider." : "We'll redirect you to your OIDC authorization endpoint."}
    </span>
  </div>

  <button
    onclick={doSSO}
    class="w-full h-10 bg-[var(--primary)] hover:bg-[var(--primary-h)] text-white rounded-md text-[13px] font-semibold flex items-center justify-center gap-2 transition"
  >
    <svg viewBox="0 0 24 24" class="w-[13px] h-[13px] stroke-white"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
    Continue with SSO
  </button>
</div>