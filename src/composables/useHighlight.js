// Lightweight syntax highlighter shared by the home and docs pages.
//
// We deliberately emit UNQUOTED data attributes (data-t=kw instead of
// class="syn-kw"): this way neither '...' nor "..." nor \bclass\b can ever
// match inside the tags we already inserted. Colors live in style.css under
// the [data-t=...] selectors.

const KEYWORDS = /\b(import|from|def|return|if|elif|else|for|while|in|as|with|class|try|except|finally|raise|assert|yield|lambda|and|or|not|is|True|False|None)\b/g
const CLASSES  = /\b(WorkerManager|FakeBackend|ProcessBackend|BootProvider|Engine|Flask|FastAPI|request|jsonify)\b/g
const FUNCS    = /\b(start_worker|stop_worker|list_workers|recover_workers|dispose|for_testing|create_app|create_engine|is_running|start_count|started_types|started_keys|running_keys|parameters_for|crash|wait_for|wait_for_file|wait_for_log|wait_for_worker_status|wait_for_worker_in_db|wait_for_worker_pid|wait_for_pid_dead|print|range|len|get|loads|sleep)\b/g

function escapeHtml(code) {
  return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function highlightPython(code) {
  return escapeHtml(code)
    .replace(KEYWORDS, '<span data-t=kw>$1</span>')
    .replace(/("[^"]*"|'[^']*')/g, '<span data-t=str>$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span data-t=num>$1</span>')
    .replace(CLASSES, '<span data-t=cls>$1</span>')
    .replace(FUNCS, '<span data-t=fn>$1</span>')
    .replace(/(#[^<\n]*)/g, '<span data-t=cm>$1</span>')
}

export function highlightBash(code) {
  return escapeHtml(code)
    // comments first (a leading # on its own, or after the prompt)
    .replace(/(#[^<\n]*)/g, '<span data-t=cm>$1</span>')
    .replace(/("[^"]*"|'[^']*')/g, '<span data-t=str>$1</span>')
    // the interactive prompt
    .replace(/^(\s*)\$ /gm, '$1<span data-t=cli>$</span> ')
    // known commands
    .replace(/\b(crazy-workers|pip|python|export|echo|git|cd|loginctl|schtasks|systemctl)\b/g, '<span data-t=fn>$1</span>')
    // sub-commands / flags
    .replace(/(\s)(--[a-z-]+)/g, '$1<span data-t=cls>$2</span>')
    .replace(/\b(status|start|stop|params|install)\b/g, '<span data-t=kw>$1</span>')
}

export function highlight(code, lang = 'python') {
  return lang === 'bash' ? highlightBash(code) : highlightPython(code)
}
