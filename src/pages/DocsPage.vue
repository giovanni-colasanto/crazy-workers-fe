<template>
  <div class="docs-page">
    <!-- Mobile TOC toggle -->
    <button
      class="toc-toggle"
      @click="tocOpen = !tocOpen"
    >
      <v-icon
        :icon="tocOpen ? 'mdi-close' : 'mdi-format-list-bulleted'"
        size="18"
      />
      <span>{{ activeLabel || 'On this page' }}</span>
      <v-icon
        icon="mdi-chevron-down"
        size="18"
        class="toc-toggle-caret"
        :class="{ open: tocOpen }"
      />
    </button>

    <div class="docs-shell">
      <!-- ───────── Sidebar index ───────── -->
      <aside
        class="docs-toc"
        :class="{ open: tocOpen }"
      >
        <div class="toc-head">
          <v-icon
            icon="mdi-book-open-variant"
            size="16"
            color="#BF00FF"
          />
          Documentation
        </div>
        <nav class="toc-nav">
          <a
            v-for="s in sections"
            :key="s.id"
            class="toc-item"
            :class="{ active: activeId === s.id }"
            @click="go(s.id)"
          >
            <v-icon
              :icon="s.icon"
              size="15"
            />
            <span>{{ s.label }}</span>
          </a>
        </nav>
        <div class="toc-foot">
          <RouterLink
            to="/"
            class="toc-back"
          >
            <v-icon
              icon="mdi-arrow-left"
              size="14"
            /> Back to home
          </RouterLink>
        </div>
      </aside>

      <!-- ───────── Content ───────── -->
      <main class="docs-main">
        <!-- Header -->
        <div class="docs-hero">
          <div class="section-label">
            <span>CRAZY-WORKERS</span><span class="label-line" />
          </div>
          <h1 class="docs-title">
            The <span class="gradient-text">complete guide</span>
          </h1>
          <p class="docs-lead">
            Everything you need to run background worker processes with persistent state,
            automatic crash recovery, boot-restore, and a built-in CLI — without Celery,
            Redis, or any extra infrastructure.
          </p>
          <div class="docs-meta">
            <a
              class="meta-pill"
              href="https://pypi.org/project/crazy-workers/"
              target="_blank"
            >
              <v-icon
                icon="mdi-package-variant"
                size="14"
              /> PyPI
            </a>
            <a
              class="meta-pill"
              href="https://github.com/giovanni-colasanto/crazy-workers"
              target="_blank"
            >
              <v-icon
                icon="mdi-github"
                size="14"
              /> GitHub
            </a>
            <span class="meta-pill static"><v-icon
              icon="mdi-language-python"
              size="14"
            /> Python 3.10+</span>
            <span class="meta-pill static"><v-icon
              icon="mdi-license"
              size="14"
            /> MIT</span>
          </div>
        </div>

        <!-- ── Overview ── -->
        <section
          id="overview"
          class="doc-section"
        >
          <h2 class="doc-h2">
            Overview
          </h2>
          <p class="doc-p">
            <strong>crazy-workers</strong> manages long-running background Python scripts as
            independent OS processes. It persists their state in SQLite (or your own database),
            detects and restarts crashes, survives machine reboots, and gives you both a Python
            API and a terminal CLI to drive it all.
          </p>
          <div class="callout">
            <v-icon
              icon="mdi-lightbulb-on-outline"
              size="18"
              color="#FFB800"
            />
            <div>
              <strong>The mental model:</strong> a worker is just a <code>.py</code> file in a
              <code>workers/</code> folder. You declare it should be running, and a
              <a
                class="ilink"
                @click="go('model')"
              >reconciler daemon</a> keeps a durable record of the
              <em>desired</em> state and drives the <em>actual</em> processes toward it — putting things
              back the way they were after a crash or reboot.
            </div>
          </div>
          <div class="why-grid">
            <div
              v-for="w in why"
              :key="w.t"
              class="why-card"
              :style="`--c:${w.c}`"
            >
              <v-icon
                :icon="w.i"
                :color="w.c"
                size="20"
              />
              <div class="why-t">
                {{ w.t }}
              </div>
              <div class="why-d">
                {{ w.d }}
              </div>
            </div>
          </div>
        </section>

        <!-- ── Installation ── -->
        <section
          id="installation"
          class="doc-section"
        >
          <h2 class="doc-h2">
            Installation
          </h2>
          <p class="doc-p">
            Install from PyPI:
          </p>
          <CodeBlock
            lang="bash"
            :code="code.install"
          />
          <p class="doc-p">
            Or from source:
          </p>
          <CodeBlock
            lang="bash"
            :code="code.installSrc"
          />
        </section>

        <!-- ── Quick Start ── -->
        <section
          id="quickstart"
          class="doc-section"
        >
          <h2 class="doc-h2">
            Quick Start
          </h2>
          <p class="doc-p">
            <strong>1.</strong> Create a worker script — a plain Python file that reads its parameters with <code>parse_params</code>:
          </p>
          <CodeBlock
            filename="workers/my_worker.py"
            :code="code.worker"
          />
          <p class="doc-p">
            <strong>2.</strong> Manage it from Python:
          </p>
          <CodeBlock
            filename="app.py"
            :code="code.manage"
          />
          <p class="doc-p">
            <strong>3.</strong> Or straight from the terminal:
          </p>
          <CodeBlock
            lang="bash"
            :code="code.cliQuick"
          />
        </section>

        <!-- ── Worker Contract ── -->
        <section
          id="concepts"
          class="doc-section"
        >
          <h2 class="doc-h2">
            Worker Script Contract
          </h2>
          <p class="doc-p">
            A worker receives its parameters as a JSON string in <code>sys.argv[1]</code>. The
            <code>parse_params</code> helper reads and validates it for you:
          </p>
          <CodeBlock :code="code.contract" />
          <p class="doc-p">
            A worker is a <em>separate process</em>, so it cannot be handed a live object such as a
            database connection. Pass <strong>configuration</strong> instead: the manager's
            <code>worker_env</code> (and any per-call <code>env</code>) is injected as environment
            variables, so a worker reads, say, <code>os.environ['DATABASE_URL']</code> and opens its
            own connection.
          </p>
        </section>

        <!-- ── Daemon & Reconciler ── -->
        <section
          id="model"
          class="doc-section"
        >
          <h2 class="doc-h2">
            Daemon &amp; Reconciler
          </h2>
          <p class="doc-p">
            crazy-workers separates <strong>who decides</strong> from <strong>who acts</strong>. Every
            worker row carries two states:
          </p>
          <ul class="doc-ul">
            <li><strong><code>desired_status</code></strong> — what you want (<code>RUNNING</code> / <code>STOPPED</code>). Written only by <em>clients</em>: your HTTP API, the CLI, scripts.</li>
            <li><strong><code>status</code> / <code>pid</code></strong> — what actually is. Written only by whoever owns the processes: the <em>daemon</em>.</li>
          </ul>
          <p class="doc-p">
            A single <strong>reconciler daemon</strong> owns the processes for a workers dir / database and
            continuously drives observed state toward desired state. Clients never spawn anything — they set
            <code>desired_status</code> and the daemon makes it so. This is what lets the control plane (an API)
            live in a different process, or even a different container, from the workers.
          </p>
          <div class="table-wrap">
            <div class="g-table model-table">
              <div class="g-row g-head">
                <span>desired</span><span>alive</span><span>the daemon…</span>
              </div>
              <div
                v-for="r in reconcileTable"
                :key="r.d + r.a"
                class="g-row"
              >
                <span class="g-strong">{{ r.d }}</span><span>{{ r.a }}</span><span>{{ r.act }}</span>
              </div>
            </div>
          </div>
          <p class="doc-p">
            Run the daemon as its own service; drive it with a <code>WorkerClient</code> (or the CLI):
          </p>
          <CodeBlock
            lang="bash"
            filename="daemon (systemd unit / container)"
            :code="code.daemon"
          />
          <CodeBlock
            filename="client.py"
            :code="code.client"
          />
          <div class="callout">
            <v-icon
              icon="mdi-shield-refresh-outline"
              size="18"
              color="#BF00FF"
            />
            <div>
              <strong>Crash backoff.</strong> When a <code>RUNNING</code> worker’s process dies, the daemon
              records the crash (<code>CRASHED</code>, <code>restart_count += 1</code>) and restarts it with
              <strong>exponential backoff</strong> — 1s, 2s, 4s… capped at 60s — so a worker that fails
              instantly (e.g. a missing required parameter) backs off instead of respawning in a hot loop.
              Once a worker is observed alive a full pass after its spawn, the backoff resets to zero.
            </div>
          </div>
          <div class="callout">
            <v-icon
              icon="mdi-autorenew"
              size="18"
              color="#00F5FF"
            />
            <div>
              <strong>Parameter changes recycle the worker.</strong> Re-declaring a <code>RUNNING</code>
              worker with different parameters updates its spec in the DB; the daemon compares that spec
              against what the live process was <em>actually spawned with</em> (read back from its command
              line) and, when they diverge, stops it — desired stays <code>RUNNING</code>, so the next pass
              restarts it with the new parameters. A worker is never left silently running with a stale spec.
            </div>
          </div>
          <div class="callout warn">
            <v-icon
              icon="mdi-information-outline"
              size="18"
              color="#FFB800"
            />
            <div>
              <strong>Embedded mode still exists.</strong> A <code>WorkerManager</code> can own the processes
              in-process (no separate daemon) for monolithic apps and tests — see the Python API below. The
              daemon model is the default for anything that spans processes or containers.
            </div>
          </div>
        </section>

        <!-- ── Python API ── -->
        <section
          id="api"
          class="doc-section"
        >
          <h2 class="doc-h2">
            Python API
          </h2>

          <h3 class="doc-h3">
            <code>WorkerManager(workers_dir, ...)</code>
          </h3>
          <p class="doc-p">
            Initialise the manager pointing at the folder containing your worker scripts.
          </p>
          <ParamTable :rows="constructorParams" />

          <h3 class="doc-h3">
            <code>WorkerManager.for_testing(workers_dir)</code>
          </h3>
          <p class="doc-p">
            Classmethod that wires a <strong>FakeBackend</strong>: spawning and termination are faked,
            but the state machine (SQLite, recovery, validation) stays real and runs in-process. The
            backend is exposed as <code>manager.test</code>. See <a
              class="ilink"
              @click="go('testing')"
            >Testing your app</a>.
          </p>

          <h3 class="doc-h3">
            <code>start_worker(worker_type, worker_key=None, parameters=None, env=None, reset_backoff=True)</code>
          </h3>
          <p class="doc-p">
            Spawn a new background process running the named worker script. In embedded mode you call this directly; under the daemon model the reconciler calls it for you.
          </p>
          <ParamTable :rows="startParams" />
          <p class="doc-returns">
            <span>returns</span> <code>(bool, dict | str)</code> — <code>(True, worker_dict)</code> on success, <code>(False, error_message)</code> on failure.
          </p>
          <div class="callout warn">
            <v-icon
              icon="mdi-alert-outline"
              size="18"
              color="#FFB800"
            />
            <div>
              <strong>Note on <code>RUNNING</code>:</strong> success means the worker was <em>spawned</em>
              and survived a brief startup grace period that catches immediate launch failures. It does
              <em>not</em> guarantee the worker runs to completion — a worker that fails later is still
              reported <code>RUNNING</code> until the next <code>list_workers()</code> /
              <code>recover_workers()</code> reconciles its state.
            </div>
          </div>

          <h3 class="doc-h3">
            <code>stop_worker(worker_key)</code>
          </h3>
          <p class="doc-p">
            Gracefully terminates the worker (SIGTERM → SIGKILL after timeout). Unmanaged child processes are also terminated; independently-managed nested workers are preserved. Returns <code>(bool, str)</code>.
          </p>

          <h3 class="doc-h3">
            <code>list_workers()</code>
          </h3>
          <p class="doc-p">
            Returns a list of worker dicts including <code>RUNNING</code>, <code>STOPPED</code>, <code>CRASHED</code>, and <code>NEVER_STARTED</code> (filesystem-discovered) workers.
          </p>

          <h3 class="doc-h3">
            <code>recover_workers()</code>
          </h3>
          <p class="doc-p">
            Restarts any worker whose DB status is <code>RUNNING</code> but whose process is dead. Uses a file lock to prevent concurrent recovery. Returns a list of restarted keys.
          </p>
          <div class="callout">
            <v-icon
              icon="mdi-information-outline"
              size="18"
              color="#00F5FF"
            />
            <div>You rarely call this directly: it runs automatically when the manager is constructed (<code>auto_recover=True</code>) and after a machine reboot via the boot hook. It remains available as an explicit, idempotent trigger.</div>
          </div>

          <h3 class="doc-h3">
            <code>dispose()</code>
          </h3>
          <p class="doc-p">
            Closes the database connection and clears internal process references. Does <strong>not</strong> kill background workers — they continue running independently.
          </p>

          <h3 class="doc-h3">
            <code>WorkerClient(db_url=None, engine=None, create_tables=False)</code>
          </h3>
          <p class="doc-p">
            The <strong>control-plane client</strong> for the daemon model. It shares the daemon’s database and
            only touches the <code>workers</code> table — no processes, no boot hooks. Anything that is not the
            daemon (your HTTP API, the CLI, scripts) uses it to declare intent.
          </p>
          <ParamTable :rows="clientParams" />
          <div class="table-wrap">
            <div class="g-table test-table">
              <div class="g-row g-head">
                <span>Method</span><span>What it does</span>
              </div>
              <div
                v-for="m in clientApi"
                :key="m.m"
                class="g-row"
              >
                <span><code>{{ m.m }}</code></span><span>{{ m.r }}</span>
              </div>
            </div>
          </div>
          <CodeBlock
            filename="client.py"
            :code="code.client"
          />

          <h3 class="doc-h3">
            <code>parse_params(argv=None, required=())</code>
          </h3>
          <p class="doc-p">
            Worker-side helper. Returns the parameters dict the daemon passed in <code>sys.argv[1]</code>. It is
            deliberately lightweight — importing it does <em>not</em> pull in the control plane or SQLAlchemy —
            so a worker script can <code>from crazy_workers import parse_params</code> with no heavy cost.
          </p>
          <ParamTable :rows="parseParamsParams" />
          <p class="doc-returns">
            <span>returns</span> <code>dict</code> — the parsed parameters, or <code>{}</code> when launched with none (unless <code>required</code> is given, in which case a missing key exits the worker with code 1).
          </p>
          <CodeBlock
            filename="workers/recorder.py"
            :code="code.parseParams"
          />
        </section>

        <!-- ── CLI ── -->
        <section
          id="cli"
          class="doc-section"
        >
          <h2 class="doc-h2">
            CLI Reference
          </h2>
          <p class="doc-p">
            The <code>crazy-workers</code> command manages workers directly from the terminal.
          </p>

          <h3 class="doc-h3">
            Worker directory discovery
          </h3>
          <p class="doc-p">
            The CLI resolves the workers directory through a tiered mechanism (highest priority first):
          </p>
          <ol class="doc-ol">
            <li><code>--workers-dir PATH</code> — must point to an existing directory.</li>
            <li><code>CRAZY_WORKERS_DIR</code> environment variable — shell or a local <code>.env</code>.</li>
            <li>Interactive prompt — in a TTY, asks for the path and saves it to <code>.env</code>.</li>
            <li>Auto-detection — a folder named <code>workers/</code> in the current directory.</li>
          </ol>
          <p class="doc-p doc-muted">
            Unlike the library, the CLI <strong>never creates</strong> the workers directory.
          </p>

          <h3 class="doc-h3">
            <code>status</code>
          </h3>
          <p class="doc-p">
            The observability hub. Shows the target state store (a shared DB, or the self-contained SQLite file) and the worker table — <strong>effective status</strong>, PID, last action, and parameters. When the observed state diverges from the requested one, the row carries a pending note the daemon still has to resolve: <code>RUNNING (stop requested)</code>, <code>STOPPED (start pending)</code>, <code>CRASHED (restart pending)</code> — so a stop that never lands stays visible instead of hiding behind a stale desired value.
          </p>
          <p class="doc-p">
            Stopped workers are history, not activity: only the <strong>2 most recently stopped</strong> rows are shown and the rest collapses into an explicit caption under the table. Nothing is deleted — <code>--all</code> shows every row, and <code>--json</code> always emits the full list including <code>desired_status</code>.
          </p>
          <CodeBlock
            lang="bash"
            :code="code.cliStatus"
          />

          <h3 class="doc-h3">
            <code>start</code>
          </h3>
          <p class="doc-p">
            <em>Requests</em> a worker to run — it sets <code>desired_status = RUNNING</code>; the daemon starts it. If <code>worker_type</code> is omitted, presents an interactive list of available scripts. Re-running <code>start</code> on a worker that is already <code>RUNNING</code> with different <code>--params</code> recycles it: the daemon restarts the process with the new parameters within a couple of reconcile passes.
          </p>
          <CodeBlock
            lang="bash"
            :code="code.cliStart"
          />

          <h3 class="doc-h3">
            <code>stop</code>
          </h3>
          <p class="doc-p">
            <em>Requests</em> a worker to stop — it sets <code>desired_status = STOPPED</code>; the daemon terminates it (interactive if the key is omitted).
          </p>
          <CodeBlock
            lang="bash"
            :code="code.cliStop"
          />

          <h3 class="doc-h3">
            <code>params</code>
          </h3>
          <p class="doc-p">
            Displays the parameters a worker was started with, formatted as JSON.
          </p>
          <CodeBlock
            lang="bash"
            :code="code.cliParams"
          />

          <h3 class="doc-h3">
            <code>daemon</code>
          </h3>
          <p class="doc-p">
            Runs the reconcile loop that <strong>owns the worker processes</strong>. Run exactly one per workers dir / shared DB (a systemd unit or its own container); the other commands are just clients that write desired state for it to act on.
          </p>
          <CodeBlock
            lang="bash"
            :code="code.cliDaemon"
          />

          <div class="callout">
            <v-icon
              icon="mdi-information-outline"
              size="18"
              color="#00F5FF"
            />
            <div>
              <strong>No <code>restore</code> command.</strong> Under the daemon model, surviving a reboot is the deployment’s job — run the daemon as a service that restarts on boot. The legacy per-user boot hook (see <a
                class="ilink"
                @click="go('boot')"
              >Boot-Restore</a>) and <code>manager.recover_workers()</code> remain for embedded use.
            </div>
          </div>

          <h3 class="doc-h3">
            Configuration via <code>.env</code>
          </h3>
          <CodeBlock
            lang="bash"
            :code="code.cliEnv"
          />
        </section>

        <!-- ── Backend integration ── -->
        <section
          id="backend"
          class="doc-section"
        >
          <h2 class="doc-h2">
            Backend Integration
          </h2>
          <p class="doc-p">
            The recommended shape for a real backend is the <a
              class="ilink"
              @click="go('model')"
            >daemon model</a>: your API is a <strong>client</strong> that only writes desired state, and a separate <strong>daemon</strong> process owns the workers. Both share one database, so the API can serve the files a worker produces while the daemon runs it — even from a different container.
          </p>
          <CodeBlock
            filename="api + daemon"
            :code="code.reconciler"
          />
          <p class="doc-p">
            Whichever mode you pick, three integration points let crazy-workers cooperate with your project instead of living off to the side:
          </p>
          <ul class="doc-ul">
            <li><strong>Co-locate its tables in your database.</strong> Pass an existing SQLAlchemy <code>engine</code> (or a <code>db_url</code>) to the client, daemon, or manager. crazy-workers uses a single <code>workers</code> table inside your database and inherits its persistence and backups. A shared engine is never disposed by crazy-workers.</li>
            <li><strong>Give workers the connection they need.</strong> A worker can't receive a live DB connection — pass the configuration. <code>worker_env={'DATABASE_URL': ...}</code> is injected into every spawned worker (overridable per call via <code>start_worker(..., env=...)</code>).</li>
            <li><strong>Automatic crash recovery.</strong> The daemon restarts dead-but-<code>RUNNING</code> workers every reconcile pass (with backoff). In embedded mode, <code>auto_recover=True</code> (default) does the same when the manager is built, so a restarting backend brings its workers back with no explicit call.</li>
          </ul>
          <CodeBlock
            filename="app.py (embedded mode)"
            :code="code.backend"
          />
        </section>

        <!-- ── Boot-restore ── -->
        <section
          id="boot"
          class="doc-section"
        >
          <h2 class="doc-h2">
            Automatic Boot-Restore <span class="tag-legacy">legacy / opt-in</span>
          </h2>
          <div class="callout warn">
            <v-icon
              icon="mdi-information-outline"
              size="18"
              color="#FFB800"
            />
            <div>
              In the <a
                class="ilink"
                @click="go('model')"
              >daemon model</a>, surviving a reboot is the
              deployment’s job — run the daemon as a systemd unit or a container with a restart policy.
              This per-worker hook is therefore <strong>opt-in</strong> and <code>auto_boot</code> defaults
              to <code>False</code>. It stays available for embedded, host-less setups.
            </div>
          </div>
          <p class="doc-p">
            With <code>auto_boot=True</code>, starting a worker transparently installs a <strong>per-user OS
              hook</strong> for its workers directory, so workers come back after a reboot without any host
            application running. The hook calls <code>python -m crazy_workers.boot --workers-dir &lt;dir&gt;</code>,
            which runs <code>recover_workers()</code>. The install is best-effort and happens at most once per directory.
          </p>
          <div class="table-wrap">
            <div class="g-table boot-table">
              <div class="g-row g-head">
                <span>Platform</span><span>Mechanism</span><span>When it runs</span>
              </div>
              <div
                v-for="b in bootTable"
                :key="b.platform"
                class="g-row"
              >
                <span class="g-strong">{{ b.platform }}</span><span>{{ b.mech }}</span><span>{{ b.when }}</span>
              </div>
            </div>
          </div>
          <div class="callout warn">
            <v-icon
              icon="mdi-alert-outline"
              size="18"
              color="#FFB800"
            />
            <div>
              <strong>Unattended boot caveat.</strong> Recovery is durable across reboots, but running it
              <em>without any login</em> depends on the OS:
              <ul class="doc-ul tight">
                <li><strong>Linux:</strong> enable lingering once as root — <code>loginctl enable-linger &lt;user&gt;</code> — so the user's systemd starts at boot. Without it, restore runs at next login.</li>
                <li><strong>Windows:</strong> a user task fires at logon; true pre-logon start needs autologon or an admin-installed task.</li>
              </ul>
              <code>crazy-workers status</code> always reports whether the hook runs <strong>at boot</strong> or <strong>at login</strong>.
            </div>
          </div>
          <p class="doc-p">
            <strong>Force-disable.</strong> Even where something opts in with <code>auto_boot=True</code>, setting <code>CRAZY_WORKERS_NO_BOOT</code> (any non-empty value) suppresses the install — useful in containers or CI.
          </p>
        </section>

        <!-- ── Gunicorn ── -->
        <section
          id="gunicorn"
          class="doc-section"
        >
          <h2 class="doc-h2">
            Gunicorn / Multi-Process Servers
          </h2>
          <p class="doc-p">
            When using a pre-fork server like Gunicorn:
          </p>
          <ul class="doc-ul">
            <li><strong>Recovery is atomic</strong> — a file lock (<code>.service/workers.db.recovery.lock</code>) ensures <code>recover_workers()</code> runs once even when multiple workers boot simultaneously.</li>
            <li><strong>Workers outlive their parent</strong> — if a Gunicorn worker is recycled, background processes keep running. The next recovery cycle re-attaches or restarts them.</li>
          </ul>
        </section>

        <!-- ── Testing ── -->
        <section
          id="testing"
          class="doc-section"
        >
          <h2 class="doc-h2">
            Testing Your App
          </h2>
          <p class="doc-p">
            Code that uses <code>WorkerManager</code> has two kinds of logic worth testing:
            <strong>orchestration</strong> (which workers start, pairing, rollback, recovery) and the
            <strong>work itself</strong>. <code>crazy_workers.testing</code> makes both fast and non-flaky.
          </p>

          <h3 class="doc-h3">
            Orchestration — without launching a single process
          </h3>
          <p class="doc-p">
            <code>WorkerManager.for_testing()</code> wires a FakeBackend: spawning and termination are faked, but the state machine stays real and runs in-process.
          </p>
          <CodeBlock
            filename="test_orchestration.py"
            :code="code.testOrch"
          />
          <p class="doc-p">
            <code>manager.test</code> exposes:
          </p>
          <div class="table-wrap">
            <div class="g-table test-table">
              <div class="g-row g-head">
                <span>Member</span><span>Returns</span>
              </div>
              <div
                v-for="t in testApi"
                :key="t.m"
                class="g-row"
              >
                <span><code>{{ t.m }}</code></span><span>{{ t.r }}</span>
              </div>
            </div>
          </div>

          <h3 class="doc-h3">
            The real thing — polling helpers, not <code>sleep</code>
          </h3>
          <p class="doc-p">
            The few tests that <em>must</em> launch real processes should wait on conditions, never fixed sleeps:
          </p>
          <CodeBlock
            filename="test_end_to_end.py"
            :code="code.testReal"
          />
          <p class="doc-p">
            Available helpers (each raises <code>AssertionError</code> with a useful message on timeout):
          </p>
          <div class="chip-row">
            <code
              v-for="h in pollingHelpers"
              :key="h"
              class="chip"
            >{{ h }}</code>
          </div>
        </section>

        <!-- ── Logs ── -->
        <section
          id="logs"
          class="doc-section"
        >
          <h2 class="doc-h2">
            Logs
          </h2>
          <p class="doc-p">
            Each worker's stdout/stderr is appended to <code>.service/logs/&lt;worker_key&gt;.log</code>.
            These files are written directly by the worker process, so the library does <strong>not</strong>
            rotate them — they grow until you act. For long-lived deployments, rotate them externally
            (e.g. <code>logrotate</code> with <code>copytruncate</code>) or have your worker configure its own
            <code>RotatingFileHandler</code> instead of writing to stdout/stderr.
          </p>
        </section>

        <!-- ── Security ── -->
        <section
          id="security"
          class="doc-section"
        >
          <h2 class="doc-h2">
            Security
          </h2>
          <ul class="doc-ul">
            <li><strong>Safe identifier charset.</strong> Worker types and keys are restricted to <code>A-Z a-z 0-9 _ -</code>, with a defence-in-depth check that the resolved script path stays inside the workers directory. This blocks path traversal on both Unix and Windows (including drive-relative names like <code>c:evil</code>).</li>
            <li><strong>PID-reuse safe.</strong> Each worker is tagged with an identity token on its command line; recovery and stop confirm a PID still belongs to the worker before acting, so a recycled PID is never mistaken for — or killed as — a live worker.</li>
            <li><strong>Zombie protection.</strong> Active processes are distinguished from zombies using <code>psutil</code>.</li>
          </ul>
          <div class="callout warn">
            <v-icon
              icon="mdi-shield-alert-outline"
              size="18"
              color="#FF3D71"
            />
            <div>
              <strong>Exposing <code>start_worker()</code> over HTTP is a privileged operation</strong> — anyone
              who can reach the route can launch any script in your workers directory. Put such routes behind
              authentication and validate <code>worker_type</code> against a known allow-list.
            </div>
          </div>
        </section>

        <!-- ── Support ── -->
        <section
          id="support"
          class="doc-section"
        >
          <h2 class="doc-h2">
            Support the Project
          </h2>
          <p class="doc-p">
            crazy-workers is free and open-source (MIT). If it saves you time, consider supporting its development:
          </p>
          <div class="support-row">
            <a
              class="support-btn"
              href="https://github.com/sponsors/giovanni-colasanto"
              target="_blank"
            >
              <v-icon
                icon="mdi-heart"
                size="16"
              /> GitHub Sponsors
            </a>
            <a
              class="support-btn alt"
              href="https://github.com/giovanni-colasanto/crazy-workers"
              target="_blank"
            >
              <v-icon
                icon="mdi-star-outline"
                size="16"
              /> Star the repo
            </a>
          </div>
        </section>

        <!-- Footer nav -->
        <div class="docs-pagefoot">
          <RouterLink
            to="/"
            class="pf-link"
          >
            <v-icon
              icon="mdi-arrow-left"
              size="16"
            /> Back to home
          </RouterLink>
          <a
            class="pf-link"
            href="https://github.com/giovanni-colasanto/crazy-workers"
            target="_blank"
          >View source on GitHub <v-icon
            icon="mdi-github"
            size="16"
          /></a>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import CodeBlock from '../components/CodeBlock.vue';
import ParamTable from '../components/ParamTable.vue';

const route = useRoute();

const sections = [
  { id: 'overview',     label: 'Overview',                 icon: 'mdi-book-open-page-variant-outline' },
  { id: 'installation', label: 'Installation',             icon: 'mdi-download-outline' },
  { id: 'quickstart',   label: 'Quick Start',              icon: 'mdi-rocket-launch-outline' },
  { id: 'concepts',     label: 'Worker Contract',          icon: 'mdi-file-code-outline' },
  { id: 'model',        label: 'Daemon & Reconciler',      icon: 'mdi-sync' },
  { id: 'api',          label: 'Python API',               icon: 'mdi-code-braces' },
  { id: 'cli',          label: 'CLI Reference',            icon: 'mdi-console' },
  { id: 'backend',      label: 'Backend Integration',      icon: 'mdi-database-sync-outline' },
  { id: 'boot',         label: 'Boot-Restore',             icon: 'mdi-restart' },
  { id: 'gunicorn',     label: 'Gunicorn / Multi-Process', icon: 'mdi-server-outline' },
  { id: 'testing',      label: 'Testing Your App',         icon: 'mdi-flask-outline' },
  { id: 'logs',         label: 'Logs',                     icon: 'mdi-text-box-outline' },
  { id: 'security',     label: 'Security',                 icon: 'mdi-shield-check-outline' },
  { id: 'support',      label: 'Support',                  icon: 'mdi-heart-outline' },
];

const why = [
  { i: 'mdi-cube-off-outline',   c: '#00F5FF', t: 'Zero infrastructure', d: 'No Celery, no Redis, no broker. Just Python processes and a SQLite file.' },
  { i: 'mdi-shield-refresh-outline', c: '#BF00FF', t: 'Survives everything', d: 'Crashes, app restarts, and machine reboots — workers come back on their own.' },
  { i: 'mdi-puzzle-outline',     c: '#FF0080', t: 'Drops into your stack', d: 'Flask, FastAPI, Django, or a plain script — and into your existing database.' },
];

const activeId = ref('overview');
const tocOpen = ref(false);
const activeLabel = computed(() => sections.find(s => s.id === activeId.value)?.label);

function go(id) {
  tocOpen.value = false;
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: 'smooth' });
  activeId.value = id;
}

let observer;
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) activeId.value = e.target.id;
      });
    },
    { rootMargin: '-80px 0px -65% 0px', threshold: 0 }
  );
  document.querySelectorAll('.doc-section').forEach((el) => observer.observe(el));

  // honour a deep-link hash (e.g. /docs#cli) after mount
  if (route.hash) {
    const id = route.hash.slice(1);
    nextTick(() => setTimeout(() => go(id), 80));
  }
});
onUnmounted(() => observer?.disconnect());

// ── Param tables ──
const constructorParams = [
  { name: 'workers_dir',   type: 'str',            def: '\'workers\'', desc: 'Directory containing worker .py scripts.' },
  { name: 'create_dir',    type: 'bool',           def: 'True',      desc: 'Create workers_dir and .service/ if they don\'t exist.' },
  { name: 'backend',       type: 'ProcessBackend', def: 'None',      desc: 'Process backend; the default spawns real subprocesses (tests inject a fake).' },
  { name: 'auto_boot',     type: 'bool',           def: 'False',     desc: 'Opt-in legacy hook: install the per-user OS boot-restore hook on first start. In the daemon model, surviving a reboot is the deployment’s job.' },
  { name: 'boot_provider', type: 'BootProvider',   def: 'None',      desc: 'Override the boot-restore mechanism (mainly a test seam).' },
  { name: 'db_url',        type: 'str',            def: 'None',      desc: 'SQLAlchemy URL for worker state; defaults to SQLite under .service/.' },
  { name: 'engine',        type: 'Engine',         def: 'None',      desc: 'Reuse an existing SQLAlchemy engine so tables live in your DB; not disposed by crazy_workers.' },
  { name: 'worker_env',    type: 'dict',           def: 'None',      desc: 'Env vars injected into every spawned worker (e.g. DATABASE_URL).' },
  { name: 'auto_recover',  type: 'bool',           def: 'True',      desc: 'Recover dead-but-RUNNING workers when the manager is constructed (embedded mode).' },
];

const startParams = [
  { name: 'worker_type',   type: 'str',  def: '—',           desc: 'Filename (without .py) of the worker script.' },
  { name: 'worker_key',    type: 'str',  def: 'worker_type', desc: 'Unique identifier; allows multiple instances of the same type.' },
  { name: 'parameters',    type: 'dict', def: '{}',          desc: 'JSON-serializable dict passed as sys.argv[1] to the worker.' },
  { name: 'env',           type: 'dict', def: 'None',        desc: 'Extra environment variables injected into the worker process.' },
  { name: 'reset_backoff', type: 'bool', def: 'True',        desc: 'Clear the crash backoff on a clean start. The reconciler passes False so an automatic restart keeps accumulating the backoff.' },
];

const clientParams = [
  { name: 'db_url', type: 'str',    def: 'None', desc: 'SQLAlchemy URL of the shared state DB (mutually exclusive with engine).' },
  { name: 'engine', type: 'Engine', def: 'None', desc: 'Reuse an existing SQLAlchemy engine (e.g. your app’s), so the client writes to the same DB the daemon reads.' },
  { name: 'create_tables', type: 'bool', def: 'False', desc: 'Create the workers table. Usually False in production (a migration owns the schema).' },
];

const parseParamsParams = [
  { name: 'argv',     type: 'list',  def: 'sys.argv', desc: 'Argument vector to read from; pass a list explicitly in tests.' },
  { name: 'required', type: 'tuple', def: '()',       desc: 'Keys that must be present and non-empty. A missing key aborts the worker (exit code 1) before it does any work.' },
];

const reconcileTable = [
  { d: 'RUNNING', a: 'no',  act: 'start it — or, if it just died, record the crash and back off before retrying' },
  { d: 'RUNNING', a: 'yes', act: 'leave it running (and reset the backoff once it has proven healthy) — unless its parameters changed in the DB: then recycle it, so the next pass restarts it with the new spec' },
  { d: 'STOPPED', a: 'yes', act: 'stop it (SIGTERM → SIGKILL)' },
  { d: 'STOPPED', a: 'no',  act: 'nothing — converge a stale RUNNING/CRASHED status to STOPPED' },
];

const bootTable = [
  { platform: 'Linux',   mech: 'systemd user unit (~/.config/systemd/user)', when: 'at user login — or at true boot if lingering is enabled' },
  { platform: 'Windows', mech: 'logon Scheduled Task (schtasks /SC ONLOGON)',  when: 'at user logon' },
];

const clientApi = [
  { m: 'request_start(worker_type, worker_key=None, parameters=None)', r: 'declare a worker should be RUNNING (upsert its spec); returns the resolved worker_key' },
  { m: 'request_stop(worker_key)', r: 'declare a worker should be STOPPED; False if it does not exist' },
  { m: 'list()', r: 'every worker row as a dict (desired + observed state)' },
  { m: 'get(worker_key)', r: 'a single worker dict, or None' },
  { m: 'dispose()', r: 'release the DB connection (a shared engine is left open)' },
];

const testApi = [
  { m: 'started_types / started_keys', r: 'every spawn, in order (a restart appears twice)' },
  { m: 'running_keys',  r: 'keys whose latest process is still "alive"' },
  { m: 'is_running(key)', r: 'bool' },
  { m: 'start_count(key)', r: 'how many times the key was (re)started' },
  { m: 'parameters_for(key)', r: 'parameters of the most recent spawn' },
  { m: 'crash(key)', r: 'simulate an unexpected death (without a stop)' },
];

const pollingHelpers = [
  'wait_for', 'wait_for_file', 'wait_for_log', 'wait_for_worker_status',
  'wait_for_worker_in_db', 'wait_for_worker_pid', 'wait_for_pid_dead',
];

// ── Code samples ──
const code = {
  install: 'pip install crazy-workers',
  installSrc: `git clone https://github.com/giovanni-colasanto/crazy-workers
cd crazy-workers
pip install .`,
  worker: `import time
from crazy_workers import parse_params

# parse_params reads the JSON the daemon passes in sys.argv[1].
# With required=(...), a missing key aborts the worker before any work.
params = parse_params()
duration = params.get('duration', 60)

for _ in range(duration):
    time.sleep(1)`,
  manage: `from crazy_workers import WorkerManager

manager = WorkerManager('workers')

# Start
success, result = manager.start_worker(
    'my_worker',
    worker_key='job_1',
    parameters={'duration': 30},
)
print(result['pid'])     # OS process ID
print(result['status'])  # 'RUNNING'

# List
for w in manager.list_workers():
    print(w['worker_key'], w['status'])

# Stop
manager.stop_worker('job_1')

# Recover crashed workers (also runs automatically on construction)
restarted = manager.recover_workers()

manager.dispose()  # releases DB connection; does NOT kill workers`,
  cliQuick: `crazy-workers status
crazy-workers start my_worker --key job_1 --params '{"duration": 30}'
crazy-workers stop job_1`,
  contract: `from crazy_workers import parse_params

# Lenient: optional params, {} when launched with none.
params = parse_params()

# Strict: abort (exit 1) with a stderr message if a key is missing/empty.
params = parse_params(required=('device_id',))
device_id = params['device_id']
# ... do work ...`,
  parseParams: `from crazy_workers import parse_params

# Under the hood the daemon runs:  python worker.py '{"device_id": "2"}'
# parse_params turns that argv[1] JSON into a dict, and enforces required keys.
params = parse_params(required=('device_id',))`,
  client: `from crazy_workers import WorkerClient

# A client only writes desired state; the daemon reconciles it.
client = WorkerClient(db_url=os.environ['DATABASE_URL'], create_tables=False)
try:
    # Declare "this worker should be RUNNING" (upsert on worker_key).
    client.request_start('recorder', worker_key='cam1', parameters={'device_id': '1'})

    for w in client.list():
        print(w['worker_key'], w['desired_status'], w['status'])

    # Declare "this worker should be STOPPED" — the daemon terminates it.
    client.request_stop('cam1')
finally:
    client.dispose()`,
  daemon: `# The daemon owns the worker processes. Run one per workers dir / shared DB
# (e.g. a systemd unit or its own container).
python -m crazy_workers.daemon \\
    --workers-dir /app/workers \\
    --db-url "$DATABASE_URL"      # defaults to $CRAZY_WORKERS_DB_URL
    # --interval 2.0              # seconds between reconcile passes`,
  reconciler: `# API process — CLIENT ONLY (writes desired state, never spawns):
from crazy_workers import WorkerClient
client = WorkerClient(engine=db_engine, create_tables=False)
client.request_start('recorder', worker_key='cam1', parameters={'device_id': '1'})

# A SEPARATE daemon process owns and runs the workers, reconciling the
# shared DB toward the desired state:
#   python -m crazy_workers.daemon --workers-dir /app/workers --db-url $DATABASE_URL`,
  cliStatus: `crazy-workers status
crazy-workers status --all
crazy-workers status --json
crazy-workers --workers-dir /path/to/workers status`,
  cliStart: `# Start by type (key defaults to worker_type)
crazy-workers start example_worker

# With a custom key (multiple instances of the same type)
crazy-workers start example_worker --key job_1

# With parameters (valid JSON string)
crazy-workers start example_worker --params '{"duration": 30}'

# Interactive selection
crazy-workers start`,
  cliStop: `crazy-workers stop job_1   # explicit key
crazy-workers stop          # interactive selection`,
  cliParams: `crazy-workers params job_1
crazy-workers params         # interactive selection`,
  cliDaemon: `# Run the reconcile loop that owns the worker processes.
crazy-workers --workers-dir /app/workers daemon

# Point it at the shared DB (or set CRAZY_WORKERS_DB_URL).
CRAZY_WORKERS_DB_URL="$DATABASE_URL" crazy-workers --workers-dir /app/workers daemon`,
  cliEnv: `# Linux / macOS
export CRAZY_WORKERS_DIR=/path/to/workers

# Windows (PowerShell)
$env:CRAZY_WORKERS_DIR = "C:\\path\\to\\workers"

# Persist to .env (any platform)
echo "CRAZY_WORKERS_DIR=/path/to/workers" > .env`,
  backend: `from crazy_workers import WorkerManager

def create_app(db_engine, db_url):
    app = Flask(__name__)

    manager = WorkerManager(
        'workers',
        engine=db_engine,                     # tables live in YOUR database
        worker_env={'DATABASE_URL': db_url},  # injected into every worker
        # auto_recover=True (default): workers left RUNNING with a dead
        # PID are restored automatically when the app boots.
    )
    return app`,
  testOrch: `from crazy_workers import WorkerManager

def test_starts_recorder_and_renamer():
    manager = WorkerManager.for_testing('workers')  # FakeBackend

    manager.start_worker('recorder', worker_key='cam1', parameters={'device': 'cam1'})
    manager.start_worker('renamer', worker_key='renamer_cam1')

    assert manager.test.started_types == ['recorder', 'renamer']
    assert manager.test.is_running('cam1')
    manager.dispose()`,
  testReal: `from crazy_workers.testing import wait_for_worker_status, wait_for_log, wait_for_pid_dead

manager = WorkerManager('workers')
ok, res = manager.start_worker('recorder', worker_key='cam1')

wait_for_worker_status(manager, 'cam1', 'RUNNING')
wait_for_log('workers/.service/logs/cam1.log', 'recording started')
# ... assert the worker actually did its job ...
manager.stop_worker('cam1')
wait_for_pid_dead(res['pid'])`,
};
</script>

<style scoped>
.docs-page {
  position: relative;
  min-height: calc(100vh - 60px);
  background:
    radial-gradient(900px 500px at 80% -5%, rgba(191,0,255,0.06), transparent 60%),
    radial-gradient(700px 500px at 0% 10%, rgba(0,245,255,0.05), transparent 60%);
}

.docs-shell {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 248px 1fr;
  gap: 48px;
  padding: 40px 24px 80px;
}

/* ── Sidebar ── */
.docs-toc {
  position: sticky;
  top: 84px;
  align-self: start;
  max-height: calc(100vh - 104px);
  overflow-y: auto;
  scrollbar-width: thin;
}
.toc-head {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.72rem; font-weight: 800; letter-spacing: 1.5px;
  text-transform: uppercase; color: rgba(224,224,255,0.5);
  padding: 0 12px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  margin-bottom: 10px;
}
.toc-nav { display: flex; flex-direction: column; gap: 1px; }
.toc-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.82rem;
  color: rgba(224,224,255,0.72);
  cursor: pointer;
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: color 0.2s, background 0.2s, border-color 0.2s;
}
.toc-item :deep(.v-icon) { opacity: 0.6; transition: opacity 0.2s; }
.toc-item:hover { color: #00F5FF; background: rgba(0,245,255,0.05); }
.toc-item.active {
  color: #fff;
  background: rgba(191,0,255,0.1);
  border-left-color: #BF00FF;
}
.toc-item.active :deep(.v-icon) { opacity: 1; color: #BF00FF; }
.toc-foot { margin-top: 16px; padding: 0 12px; }
.toc-back {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.78rem; color: rgba(224,224,255,0.68);
  text-decoration: none; transition: color 0.2s;
}
.toc-back:hover { color: #00F5FF; }

/* ── Mobile TOC toggle ── */
.toc-toggle {
  display: none;
  position: sticky;
  top: 60px;
  z-index: 20;
  width: 100%;
  align-items: center;
  gap: 10px;
  padding: 13px 20px;
  background: rgba(10,10,30,0.92);
  backdrop-filter: blur(16px);
  border: none;
  border-bottom: 1px solid rgba(191,0,255,0.18);
  color: #E0E0FF;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}
.toc-toggle span { flex: 1; text-align: left; }
.toc-toggle-caret { transition: transform 0.25s; }
.toc-toggle-caret.open { transform: rotate(180deg); }

/* ── Content ── */
.docs-main { min-width: 0; }

.docs-hero { padding-bottom: 12px; margin-bottom: 12px; }
.section-label {
  display: flex; align-items: center; gap: 12px;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 3px;
  color: #BF00FF; margin-bottom: 18px;
}
.label-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(191,0,255,.35), transparent); }
.docs-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 900; letter-spacing: -1px; line-height: 1.1;
  color: #E0E0FF; margin: 0 0 18px;
}
.docs-lead {
  font-size: 1.05rem; line-height: 1.7;
  color: rgba(224,224,255,0.82); max-width: 680px; margin: 0 0 24px;
}
.docs-meta { display: flex; flex-wrap: wrap; gap: 8px; }
.meta-pill {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.76rem; font-weight: 600;
  padding: 5px 12px; border-radius: 999px;
  color: #00F5FF; text-decoration: none;
  border: 1px solid rgba(0,245,255,0.25);
  background: rgba(0,245,255,0.05);
  transition: background 0.2s, box-shadow 0.2s;
}
.meta-pill:hover { background: rgba(0,245,255,0.12); box-shadow: 0 0 14px rgba(0,245,255,0.2); }
.meta-pill.static { color: rgba(224,224,255,0.72); border-color: rgba(255,255,255,0.1); background: rgba(255,255,255,0.02); }

/* ── Sections ── */
.doc-section {
  scroll-margin-top: 90px;
  padding: 36px 0;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.doc-h2 {
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 800; color: #E0E0FF;
  margin: 0 0 18px; letter-spacing: -0.3px;
}
.doc-h3 {
  font-size: 1rem; font-weight: 700;
  color: #00F5FF; margin: 30px 0 12px;
  font-family: 'JetBrains Mono', monospace;
}
.doc-h3 :deep(code) { background: none; padding: 0; color: inherit; font-size: 0.92em; }
.tag-legacy {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem; font-weight: 700; letter-spacing: 0.5px;
  text-transform: uppercase; vertical-align: middle;
  margin-left: 10px; padding: 3px 8px; border-radius: 6px;
  color: #FFB800; background: rgba(255,184,0,0.1);
  border: 1px solid rgba(255,184,0,0.25);
}
.doc-p {
  font-size: 0.92rem; line-height: 1.75;
  color: rgba(224,224,255,0.9); margin: 0 0 16px; max-width: 760px;
}
.doc-p strong { color: #E0E0FF; }
.doc-muted { color: rgba(224,224,255,0.68); font-size: 0.85rem; }
.doc-ul, .doc-ol { margin: 0 0 18px; padding-left: 22px; max-width: 760px; }
.doc-ul li, .doc-ol li {
  font-size: 0.9rem; line-height: 1.7;
  color: rgba(224,224,255,0.85); margin-bottom: 9px;
}
.doc-ul li strong, .doc-ol li strong { color: #E0E0FF; }
.doc-ul.tight { margin: 10px 0 4px; }

:deep(code) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82em;
  background: rgba(0,245,255,0.08);
  color: #7FE9F5;
  padding: 1px 6px;
  border-radius: 5px;
}
.ilink { color: #BF00FF; cursor: pointer; text-decoration: none; border-bottom: 1px dashed rgba(191,0,255,0.5); }
.ilink:hover { color: #D84BFF; }

/* Code blocks spacing */
.doc-section :deep(.code-wrap) { margin: 0 0 18px; }

/* ── Callout ── */
.callout {
  display: flex; gap: 12px;
  padding: 16px 18px;
  border-radius: 12px;
  background: rgba(0,245,255,0.05);
  border: 1px solid rgba(0,245,255,0.18);
  margin: 0 0 18px; max-width: 760px;
}
.callout :deep(.v-icon) { flex-shrink: 0; margin-top: 1px; }
.callout div { font-size: 0.85rem; line-height: 1.65; color: rgba(224,224,255,0.86); }
.callout strong { color: #E0E0FF; }
.callout.warn { background: rgba(255,184,0,0.05); border-color: rgba(255,184,0,0.2); }

/* ── Why cards ── */
.why-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-top: 22px; }
@media (max-width: 640px) { .why-grid { grid-template-columns: 1fr; } }
.why-card {
  padding: 20px; border-radius: 12px;
  background: #0a0a20; border: 1px solid rgba(255,255,255,0.06);
  border-top: 2px solid var(--c);
}
.why-t { font-size: 0.9rem; font-weight: 700; color: #E0E0FF; margin: 12px 0 6px; }
.why-d { font-size: 0.8rem; line-height: 1.6; color: rgba(224,224,255,0.68); }

/* ── Generic tables ── */
.table-wrap { overflow-x: auto; margin: 0 0 18px; max-width: 760px; }
.g-table {
  min-width: 480px;
  border: 1px solid rgba(0,245,255,0.12);
  border-radius: 10px;
  overflow: hidden;
  font-size: 0.83rem;
}
.g-row { display: grid; gap: 10px; padding: 10px 14px; }
.boot-table .g-row { grid-template-columns: 100px 1.4fr 1.6fr; }
.test-table .g-row { grid-template-columns: 1fr 1.4fr; }
.model-table .g-row { grid-template-columns: 96px 52px 1fr; }
.g-row:not(.g-head):nth-child(even) { background: rgba(0,245,255,0.03); }
.g-head {
  font-size: 0.66rem; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; color: rgba(224,224,255,0.82);
  background: rgba(0,245,255,0.05);
}
.g-row span { color: rgba(224,224,255,0.82); line-height: 1.55; }
.g-strong { color: #E0E0FF !important; font-weight: 600; }
.g-row :deep(code) { font-size: 0.78em; }

/* ── Returns line ── */
.doc-returns {
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  font-size: 0.85rem; color: rgba(224,224,255,0.82); margin: 0 0 16px;
}
.doc-returns span {
  font-size: 0.62rem; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; color: rgba(224,224,255,0.3);
}
.doc-returns :deep(code) { background: rgba(0,255,136,0.1); color: #00FF88; }

/* ── Chips ── */
.chip-row { display: flex; flex-wrap: wrap; gap: 8px; max-width: 760px; }
.chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.74rem;
  padding: 5px 10px; border-radius: 6px;
  background: rgba(191,0,255,0.08);
  color: #C98BFF;
  border: 1px solid rgba(191,0,255,0.18);
}

/* ── Support ── */
.support-row { display: flex; flex-wrap: wrap; gap: 12px; }
.support-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 22px; border-radius: 8px;
  font-size: 0.85rem; font-weight: 700; text-decoration: none;
  background: linear-gradient(135deg, #CC0066, #FF0080); color: #fff;
  box-shadow: 0 4px 18px rgba(255,0,128,0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}
.support-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(255,0,128,0.45); }
.support-btn.alt {
  background: rgba(255,184,0,0.08); color: #FFB800;
  border: 1px solid rgba(255,184,0,0.3); box-shadow: none;
}
.support-btn.alt:hover { background: rgba(255,184,0,0.14); box-shadow: 0 4px 16px rgba(255,184,0,0.2); }

/* ── Page footer ── */
.docs-pagefoot {
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  margin-top: 40px; padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.pf-link {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.85rem; font-weight: 600;
  color: rgba(224,224,255,0.82); text-decoration: none;
  transition: color 0.2s;
}
.pf-link:hover { color: #00F5FF; }

/* ── Responsive ── */
@media (max-width: 900px) {
  .docs-shell { grid-template-columns: 1fr; gap: 0; padding: 0 16px 64px; }
  .toc-toggle { display: flex; }
  .docs-toc {
    position: static;
    max-height: 0;
    overflow: hidden;
    padding: 0;
    border-bottom: 1px solid transparent;
    transition: max-height 0.3s ease, padding 0.3s ease;
  }
  .docs-toc.open {
    max-height: 70vh;
    overflow-y: auto;
    padding: 16px 0 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .docs-hero { padding-top: 28px; }
}
</style>
