import { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "https://parikshe-app.onrender.com/api";

const recent = [
  { user: "9988776655", action: "Purchased PU2 Full-year", time: "10m ago" },
  { user: "8877665544", action: "Started Test: Light", time: "25m ago" }
];

const quickPanels = [
  { title: "Products", body: "Manage categories and batches" },
  { title: "Content", body: "Upload videos, PDFs, tests" },
  { title: "Live Schedule", body: "Create upcoming classes" },
  { title: "Coupons", body: "Open and restricted offers" },
  { title: "Users", body: "Purchases and access grants" },
  { title: "Reports", body: "Enrollment and funnel views" }
];

function App() {
  const [kpis, setKpis] = useState([
    { label: "Enrollments (Today)", value: "-" },
    { label: "Active Users", value: "-" },
    { label: "Watch Time", value: "-" },
    { label: "Conversion", value: "-" }
  ]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [products, setProducts] = useState<
    {
      id: string;
      title: string;
      type: string;
      price: number;
      categoryId: string;
      durationMonths?: number | null;
      isActive?: boolean;
    }[]
  >([]);
  const [form, setForm] = useState({
    title: "",
    categoryId: "",
    type: "full_year",
    price: 0,
    durationMonths: 12
  });
  const [liveForm, setLiveForm] = useState({
    productId: "",
    title: "",
    teacherName: "",
    startsAt: "",
    durationMinutes: 60
  });
  const [liveClasses, setLiveClasses] = useState<
    { id: string; title: string; teacherName: string; startsAt: string }[]
  >([]);
  const [categoryForm, setCategoryForm] = useState({ id: "", name: "" });
  const [syncHistory, setSyncHistory] = useState<
    { id: string; status: string; syncedCount: number; createdAt: string }[]
  >([]);

  const adminFetch = (input: string, init?: RequestInit) => fetch(input, init);

  useEffect(() => {
    adminFetch(`${API_BASE}/admin/reports`)
      .then(res => res.json())
      .then(data => {
        setKpis([
          { label: "Enrollments (Today)", value: `${data.enrollments ?? 0}` },
          { label: "Active Users", value: `${data.activeUsers ?? 0}` },
          { label: "Watch Time", value: `${data.watchTimeHours ?? 0} hrs` },
          { label: "Conversion", value: `${data.conversionRate ?? 0}%` }
        ]);
      })
      .catch(() => {
        setKpis(prev => prev);
      });
  }, []);

  useEffect(() => {
    adminFetch(`${API_BASE}/admin/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories ?? []);
        if (data.categories?.[0]) {
          setForm(prev => ({ ...prev, categoryId: data.categories[0].id }));
        }
      });
    adminFetch(`${API_BASE}/admin/products`)
      .then(res => res.json())
      .then(data => setProducts(data.products ?? []));
    adminFetch(`${API_BASE}/admin/live`)
      .then(res => res.json())
      .then(data => setLiveClasses(data.liveClasses ?? []));
    adminFetch(`${API_BASE}/admin/sync/parikshe/history`)
      .then(res => res.json())
      .then(data => setSyncHistory(data.history ?? []));
  }, []);

  const handleCreateProduct = async () => {
    if (!form.title || !form.categoryId || !form.price) {
      return;
    }
    const response = await adminFetch(`${API_BASE}/admin/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        categoryId: form.categoryId,
        type: form.type,
        price: Number(form.price),
        durationMonths: form.durationMonths ? Number(form.durationMonths) : undefined
      })
    });
    if (response.ok) {
      const refreshed = await adminFetch(`${API_BASE}/admin/products`).then(res => res.json());
      setProducts(refreshed.products ?? []);
      setForm(prev => ({ ...prev, title: "", price: 0, durationMonths: 12 }));
    }
  };

  const handleUpdateProduct = async (id: string) => {
    const title = window.prompt("Update title?");
    if (!title) {
      return;
    }
    const price = window.prompt("Update price?");
    if (!price) {
      return;
    }
    const durationMonths = window.prompt("Duration months (optional)?");
    const type = window.prompt("Type (full_year/crash)?");
    const response = await adminFetch(`${API_BASE}/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        price: Number(price),
        durationMonths: durationMonths ? Number(durationMonths) : null,
        type: type || undefined
      })
    });
    if (response.ok) {
      const refreshed = await adminFetch(`${API_BASE}/admin/products`).then(res => res.json());
      setProducts(refreshed.products ?? []);
    }
  };

  const handleDeactivateProduct = async (id: string) => {
    const confirmed = window.confirm("Deactivate this product?");
    if (!confirmed) {
      return;
    }
    const response = await adminFetch(`${API_BASE}/admin/products/${id}`, {
      method: "DELETE"
    });
    if (response.ok) {
      const refreshed = await adminFetch(`${API_BASE}/admin/products`).then(res => res.json());
      setProducts(refreshed.products ?? []);
    }
  };

  const handleCreateCategory = async () => {
    if (!categoryForm.id || !categoryForm.name) {
      return;
    }
    const response = await adminFetch(`${API_BASE}/admin/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryForm)
    });
    if (response.ok) {
      const refreshed = await adminFetch(`${API_BASE}/admin/categories`).then(res => res.json());
      setCategories(refreshed.categories ?? []);
      setCategoryForm({ id: "", name: "" });
    }
  };

  const handleCreateLive = async () => {
    if (!liveForm.productId || !liveForm.title || !liveForm.teacherName || !liveForm.startsAt) {
      return;
    }
    const response = await adminFetch(`${API_BASE}/admin/live`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: liveForm.productId,
        title: liveForm.title,
        teacherName: liveForm.teacherName,
        startsAt: liveForm.startsAt,
        durationMinutes: Number(liveForm.durationMinutes)
      })
    });
    if (response.ok) {
      const refreshed = await adminFetch(`${API_BASE}/admin/live`).then(res => res.json());
      setLiveClasses(refreshed.liveClasses ?? []);
      setLiveForm({
        productId: liveForm.productId,
        title: "",
        teacherName: "",
        startsAt: "",
        durationMinutes: 60
      });
    }
  };

  const handleRenameCategory = async (id: string) => {
    const name = window.prompt("New category name?");
    if (!name) {
      return;
    }
    const response = await adminFetch(`${API_BASE}/admin/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    if (response.ok) {
      const refreshed = await adminFetch(`${API_BASE}/admin/categories`).then(res => res.json());
      setCategories(refreshed.categories ?? []);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const confirmed = window.confirm("Delete category?");
    if (!confirmed) {
      return;
    }
    const response = await adminFetch(`${API_BASE}/admin/categories/${id}`, {
      method: "DELETE"
    });
    if (response.ok) {
      const refreshed = await adminFetch(`${API_BASE}/admin/categories`).then(res => res.json());
      setCategories(refreshed.categories ?? []);
    }
  };

  const handleSyncParikshe = async () => {
    const response = await adminFetch(`${API_BASE}/admin/sync/parikshe`, {
      method: "POST"
    });
    if (response.ok) {
      const refreshed = await adminFetch(`${API_BASE}/admin/sync/parikshe/history`).then(res =>
        res.json()
      );
      setSyncHistory(refreshed.history ?? []);
    }
  };

  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="layout">
      <aside className={`sidebar ${navOpen ? "open" : ""}`}>
        <div className="brand">Parikshe Admin</div>
        <nav className="nav">
          {[
            { label: "Dashboard", anchor: "Dashboard" },
            { label: "Products", anchor: "Products" },
            { label: "Content", anchor: "Content" },
            { label: "Live", anchor: "Live" },
            { label: "Coupons", anchor: "Coupons" },
            { label: "Users", anchor: "Users" },
            { label: "Reports", anchor: "Reports" },
            { label: "Sync", anchor: "Sync" },
            { label: "Settings", anchor: "Settings" }
          ].map(item => (
            <button
              key={item.label}
              className="nav-item"
              onClick={() => {
                const element = document.getElementById(item.anchor);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
                setNavOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="nav-toggle" onClick={() => setNavOpen(prev => !prev)}>
              ☰
            </button>
            <h1>Dashboard</h1>
          </div>
          <div className="topbar-meta" />
        </header>

        <section className="kpi-grid">
          {kpis.map(kpi => (
            <div key={kpi.label} className="kpi-card">
              <div className="kpi-label">{kpi.label}</div>
              <div className="kpi-value">{kpi.value}</div>
            </div>
          ))}
        </section>

        <section className="panel" id="Dashboard">
          <h2>Recent Activity</h2>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(row => (
                <tr key={row.user}>
                  <td>{row.user}</td>
                  <td>{row.action}</td>
                  <td>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="panel" id="QuickActions">
          <h2>Quick Actions</h2>
          <div className="panel-grid">
            {quickPanels.map(panel => (
              <div key={panel.title} className="panel-card">
                <div className="panel-title">{panel.title}</div>
                <div className="panel-body">{panel.body}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel" id="Products">
          <h2>Products</h2>
          <div className="form-grid">
            <input
              placeholder="Title"
              value={form.title}
              onChange={event => setForm(prev => ({ ...prev, title: event.target.value }))}
            />
            <select
              value={form.categoryId}
              onChange={event => setForm(prev => ({ ...prev, categoryId: event.target.value }))}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              value={form.type}
              onChange={event => setForm(prev => ({ ...prev, type: event.target.value }))}
            >
              <option value="full_year">Full-year</option>
              <option value="crash">Crash</option>
            </select>
            <input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={event => setForm(prev => ({ ...prev, price: Number(event.target.value) }))}
            />
            <input
              placeholder="Duration (months)"
              type="number"
              value={form.durationMonths}
              onChange={event =>
                setForm(prev => ({ ...prev, durationMonths: Number(event.target.value) }))
              }
            />
            <button onClick={handleCreateProduct}>Create</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>Status</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.categoryId}</td>
                  <td>{product.type}</td>
                  <td>{product.isActive ? "Active" : "Inactive"}</td>
                  <td>₹{product.price}</td>
                  <td>
                    <button onClick={() => handleUpdateProduct(product.id)}>Edit</button>
                    <button onClick={() => handleDeactivateProduct(product.id)}>
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="panel" id="Live">
          <h2>Live Schedule</h2>
          <div className="form-grid">
            <select
              value={liveForm.productId}
              onChange={event => setLiveForm(prev => ({ ...prev, productId: event.target.value }))}
            >
              <option value="">Select product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.title}
                </option>
              ))}
            </select>
            <input
              placeholder="Title"
              value={liveForm.title}
              onChange={event => setLiveForm(prev => ({ ...prev, title: event.target.value }))}
            />
            <input
              placeholder="Teacher"
              value={liveForm.teacherName}
              onChange={event =>
                setLiveForm(prev => ({ ...prev, teacherName: event.target.value }))
              }
            />
            <input
              type="datetime-local"
              value={liveForm.startsAt}
              onChange={event => setLiveForm(prev => ({ ...prev, startsAt: event.target.value }))}
            />
            <input
              placeholder="Duration (mins)"
              type="number"
              value={liveForm.durationMinutes}
              onChange={event =>
                setLiveForm(prev => ({ ...prev, durationMinutes: Number(event.target.value) }))
              }
            />
            <button onClick={handleCreateLive}>Schedule</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Teacher</th>
                <th>Starts</th>
              </tr>
            </thead>
            <tbody>
              {liveClasses.map(live => (
                <tr key={live.id}>
                  <td>{live.title}</td>
                  <td>{live.teacherName}</td>
                  <td>{new Date(live.startsAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="panel" id="Categories">
          <h2>Categories</h2>
          <div className="form-grid">
            <input
              placeholder="Category id (sslc)"
              value={categoryForm.id}
              onChange={event => setCategoryForm(prev => ({ ...prev, id: event.target.value }))}
            />
            <input
              placeholder="Category name"
              value={categoryForm.name}
              onChange={event => setCategoryForm(prev => ({ ...prev, name: event.target.value }))}
            />
            <button onClick={handleCreateCategory}>Save</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <button onClick={() => handleRenameCategory(category.id)}>Edit</button>
                    <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="panel" id="Content">
          <h2>Content</h2>
          <p>Upload videos, PDFs, tests (stub)</p>
        </section>
        <section className="panel" id="Coupons">
          <h2>Coupons</h2>
          <p>Create open and restricted coupons (stub)</p>
        </section>
        <section className="panel" id="Users">
          <h2>Users</h2>
          <p>View purchases and grant access (stub)</p>
        </section>
        <section className="panel" id="Reports">
          <h2>Reports</h2>
          <p>Enrollments, active users, watch time (stub)</p>
        </section>
        <section className="panel" id="Sync">
          <h2>Parikshe.in Sync</h2>
          <button onClick={handleSyncParikshe}>Sync Now</button>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Count</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {syncHistory.map(row => (
                <tr key={row.id}>
                  <td>{row.status}</td>
                  <td>{row.syncedCount}</td>
                  <td>{new Date(row.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="panel" id="Settings">
          <h2>Settings</h2>
          <p>Admin settings (stub)</p>
        </section>
      </main>
    </div>
  );
}

export default App;
