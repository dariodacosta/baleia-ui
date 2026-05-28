<script lang="ts">
  import HistoryTable from '$lib/components/history/HistoryTable.svelte';
  import HistoryFilters from '$lib/components/history/HistoryFilters.svelte';
  import HistoryDetailPanel from '$lib/components/history/HistoryDetailPanel.svelte';

  let selectedQuery = $state(null);
  let mockQueries = [{ id: 1, sql: 'SELECT * FROM users', user: 'admin', duration: 45, status: 'success' }];
</script>

<div class="flex flex-col h-full">
  <HistoryFilters />
  <HistoryTable 
    queries={mockQueries} 
    onSelect={(q: any) => selectedQuery = q} 
  />
  <HistoryDetailPanel 
    query={selectedQuery} 
    onClose={() => selectedQuery = null} 
  />
</div>
