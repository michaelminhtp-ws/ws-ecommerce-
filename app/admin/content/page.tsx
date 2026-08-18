"use client";

import { useEffect, useState } from "react";

const API_URL = "https://api.devopsbyteflexshift.com";

type Obj = Record<string, any>;

const box: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #dbe4f0",
  borderRadius: 16,
  padding: 18,
  marginBottom: 16,
};

const input: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  border: "1px solid #cbd6e5",
  borderRadius: 9,
  fontSize: 15,
};

const textarea: React.CSSProperties = {
  ...input,
  minHeight: 90,
  resize: "vertical",
  fontFamily: "inherit",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: 12,
};

function copy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function lines(value: unknown) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function parseLines(value: string) {
  return value.split("\n").map((x) => x.trim()).filter(Boolean);
}

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [content, setContent] = useState<Obj | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      setLoading(true);
      setMessage("");

      const meRes = await fetch(`${API_URL}/api/admin/me`, {
        credentials: "include",
      });
      const me = await meRes.json().catch(() => ({}));

      if (!meRes.ok || !me.ok) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      setAuthorized(true);

      const res = await fetch(`${API_URL}/api/admin/site-content`, {
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setMessage("Could not load site content.");
        setLoading(false);
        return;
      }

      const draft = data.content?.draft_content ?? data.content?.published_content ?? {};
      setContent(copy(draft));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Connection error.");
      setLoading(false);
    }
  }

  function update(path: string[], value: any) {
    setContent((current) => {
      if (!current) return current;
      const next = copy(current);
      let cursor: Obj = next;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!cursor[key] || typeof cursor[key] !== "object") cursor[key] = {};
        cursor = cursor[key];
      }
      cursor[path[path.length - 1]] = value;
      return next;
    });
  }

  function updateNestedItem(section: string, listKey: string, index: number, field: string, value: any) {
    setContent((current) => {
      if (!current) return current;
      const next = copy(current);
      const parent = next[section] ?? {};
      const list = Array.isArray(parent[listKey]) ? [...parent[listKey]] : [];
      if (!list[index]) return current;
      list[index] = { ...list[index], [field]: value };
      parent[listKey] = list;
      next[section] = parent;
      return next;
    });
  }

  function updateReview(index: number, field: string, value: any) {
    setContent((current) => {
      if (!current) return current;
      const next = copy(current);
      const list = Array.isArray(next.reviews) ? [...next.reviews] : [];
      while (list.length < 3) {
        list.push({ name: "", city: "", pay: "", text: "", imageUrl: "", initials: "" });
      }
      list[index] = { ...list[index], [field]: value };
      next.reviews = list.slice(0, 3);
      return next;
    });
  }

  function addItem(section: string, listKey: string, item: Obj) {
    setContent((current) => {
      if (!current) return current;
      const next = copy(current);
      const parent = next[section] ?? {};
      const list = Array.isArray(parent[listKey]) ? [...parent[listKey]] : [];
      list.push(item);
      parent[listKey] = list;
      next[section] = parent;
      return next;
    });
  }

  function removeItem(section: string, listKey: string, index: number) {
    setContent((current) => {
      if (!current) return current;
      const next = copy(current);
      const parent = next[section] ?? {};
      const list = Array.isArray(parent[listKey]) ? [...parent[listKey]] : [];
      list.splice(index, 1);
      parent[listKey] = list;
      next[section] = parent;
      return next;
    });
  }

  async function saveAndPublish() {
    if (!content) return;
    try {
      setSaving(true);
      setMessage("Saving...");
      const res = await fetch(`${API_URL}/api/admin/site-content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          draft_content: content,
          published_content: content,
        }),
      });
      const data = await res.json().catch(() => ({}));
      setMessage(res.ok && data.ok ? "Saved and published successfully." : "Save failed.");
    } catch (error) {
      console.error(error);
      setMessage("Connection error while saving.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    try {
      await fetch(`${API_URL}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      window.location.href = "/admin";
    }
  }

  if (loading) return <main style={{ maxWidth: 1000, margin: "60px auto", padding: 20 }}><h1>Loading...</h1></main>;

  if (!authorized) {
    return (
      <main style={{ maxWidth: 600, margin: "70px auto", padding: 20 }}>
        <div style={box}>
          <h1>Admin session required</h1>
          <p>Please login again.</p>
          <a href="/admin"><button>Go to Login</button></a>
        </div>
      </main>
    );
  }

  if (!content) return <main style={{ maxWidth: 800, margin: "70px auto", padding: 20 }}><div style={box}><h1>Content unavailable</h1><p>{message}</p></div></main>;

  const heroFeatures = Array.isArray(content.hero?.features) ? content.hero.features : [];
  const benefits = Array.isArray(content.benefits?.items) ? content.benefits.items : [];
  const steps = Array.isArray(content.steps?.items) ? content.steps.items : [];
  const faqs = Array.isArray(content.faq?.items) ? content.faq.items : [];
  const reviews = Array.isArray(content.reviews) ? content.reviews : [];

  return (
    <main style={{ maxWidth: 1080, margin: "32px auto", padding: "0 18px 80px", fontFamily: "system-ui, sans-serif", color: "#10203f" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 20 }}>
        <div>
          <h1 style={{ marginBottom: 5 }}>Site Content Editor</h1>
          <p style={{ margin: 0, color: "#66758e" }}>Normal fields connected to PostgreSQL.</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a href="/admin"><button>Back</button></a>
          <button onClick={loadContent}>Reload Database</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <section style={box}>
  <h2>General</h2>

  <div style={grid}>
    {[
      ["country", "Country"],
      ["language", "Language"],
      ["languageCode", "Language code"],
      ["locale", "Locale"],
      ["currency", "Currency"],
      ["pageTitle", "Page title"],
    ].map(([key, label]) => (
      <label key={key}>
        <b>{label}</b>
        <input
          style={input}
          value={content.general?.[key] ?? ""}
          onChange={(e) =>
            update(["general", key], e.target.value)
          }
        />
      </label>
    ))}

    <label style={{ gridColumn: "1 / -1" }}>
      <b>Meta description</b>
      <textarea
        style={textarea}
        value={content.general?.metaDescription ?? ""}
        onChange={(e) =>
          update(["general", "metaDescription"], e.target.value)
        }
      />
    </label>
  </div>
</section>

      <section style={box}>
        <h2>Brand</h2>
        <div style={grid}>
          {[
  ["companyName", "Company name"],
  ["subtitle", "Subtitle"],
  ["startBadge", "Start badge"],
  ["logoImageUrl", "Logo Image URL"],
  ["logoAlt", "Logo alt text"],
  ["logoFallbackText", "Logo fallback letter"],
].map(([key,label]) => (
            <label key={key}><b>{label}</b><input style={input} value={content.brand?.[key] ?? ""} onChange={(e)=>update(["brand",key],e.target.value)} /></label>
          ))}
        </div>
      </section>

      <section style={box}>
        <h2>Recruitment ticker</h2>
        <label><b>Ticker text</b><textarea style={textarea} value={content.ticker?.text ?? ""} onChange={(e)=>update(["ticker","text"],e.target.value)} /></label>
        <label><b>Accessibility label</b><input style={input} value={content.ticker?.ariaLabel ?? ""} onChange={(e)=>update(["ticker","ariaLabel"],e.target.value)} /></label>
      </section>

      <section style={box}>
        <h2>Hero</h2>
        <div style={grid}>
          <label><b>Job title</b><input style={input} value={content.hero?.jobTitle ?? ""} onChange={(e)=>update(["hero","jobTitle"],e.target.value)} /></label>
          <label><b>Rating</b><input style={input} value={content.hero?.rating ?? ""} onChange={(e)=>update(["hero","rating"],e.target.value)} /></label>
          <label><b>Review count text</b><input style={input} value={content.hero?.reviewCountText ?? ""} onChange={(e)=>update(["hero","reviewCountText"],e.target.value)} /></label>
          <label><b>Recommendation text</b><input style={input} value={content.hero?.recommendationText ?? ""} onChange={(e)=>update(["hero","recommendationText"],e.target.value)} /></label>
        </div>
        <label><b>Description</b><textarea style={textarea} value={content.hero?.description ?? ""} onChange={(e)=>update(["hero","description"],e.target.value)} /></label>
        <h3>Hero feature tags</h3>
        {heroFeatures.map((item: Obj,index:number)=>(
          <div key={index} style={{...box, background:"#f8fbff"}}><div style={grid}>
            <label><b>Label</b><input style={input} value={item.label ?? ""} onChange={(e)=>updateNestedItem("hero","features",index,"label",e.target.value)} /></label>
            <label><b>Icon name</b><input style={input} value={item.icon ?? ""} onChange={(e)=>updateNestedItem("hero","features",index,"icon",e.target.value)} /></label>
          </div></div>
        ))}
      </section>

      <section style={box}>
        <h2>Salary</h2>
        <div style={grid}>
          <label><b>Minimum</b><input style={input} type="number" value={content.salary?.minimum ?? ""} onChange={(e)=>update(["salary","minimum"],Number(e.target.value))} /></label>
          <label><b>Maximum</b><input style={input} type="number" value={content.salary?.maximum ?? ""} onChange={(e)=>update(["salary","maximum"],Number(e.target.value))} /></label>
          <label><b>Comparison value</b><input style={input} type="number" value={content.salary?.comparisonValue ?? ""} onChange={(e)=>update(["salary","comparisonValue"],Number(e.target.value))} /></label>
          {[["taxLabel","Tax label"],["periodLabel","Period label"],["bonusText","Bonus text"],["comparisonLabel","Comparison label"]].map(([key,label])=>(
            <label key={key}><b>{label}</b><input style={input} value={content.salary?.[key] ?? ""} onChange={(e)=>update(["salary",key],e.target.value)} /></label>
          ))}
        </div>
      </section>

      <section style={box}>
        <h2>Quick stats</h2>
        {["age","schedule","experience"].map((key)=>(
          <div key={key} style={{...box, background:"#f8fbff"}}><h3>{key}</h3><div style={grid}>
            <label><b>Title</b><input style={input} value={content.quickStats?.[key]?.title ?? ""} onChange={(e)=>update(["quickStats",key,"title"],e.target.value)} /></label>
            <label><b>Subtitle</b><input style={input} value={content.quickStats?.[key]?.subtitle ?? ""} onChange={(e)=>update(["quickStats",key,"subtitle"],e.target.value)} /></label>
          </div></div>
        ))}
      </section>

      <section style={box}>
        <h2>Tasks</h2>
        <label><b>Section title</b><input style={input} value={content.tasks?.title ?? ""} onChange={(e)=>update(["tasks","title"],e.target.value)} /></label>
        <label><b>One task per line</b><textarea style={{...textarea,minHeight:160}} value={lines(content.tasks?.items)} onChange={(e)=>update(["tasks","items"],parseLines(e.target.value))} /></label>
      </section>

      <section style={box}>
        <h2>Benefits</h2>
        <label><b>Section title</b><input style={input} value={content.benefits?.title ?? ""} onChange={(e)=>update(["benefits","title"],e.target.value)} /></label>
        {benefits.map((item:Obj,index:number)=>(
          <div key={index} style={{...box, background:"#f8fbff"}}><div style={grid}>
            <label><b>Label</b><input style={input} value={item.label ?? ""} onChange={(e)=>updateNestedItem("benefits","items",index,"label",e.target.value)} /></label>
            <label><b>Icon name</b><input style={input} value={item.icon ?? ""} onChange={(e)=>updateNestedItem("benefits","items",index,"icon",e.target.value)} /></label>
          </div></div>
        ))}
      </section>

      <section style={box}>
        <h2>Requirements</h2>
        <label><b>Section title</b><input style={input} value={content.requirements?.title ?? ""} onChange={(e)=>update(["requirements","title"],e.target.value)} /></label>
        <label><b>One requirement per line</b><textarea style={{...textarea,minHeight:170}} value={lines(content.requirements?.items)} onChange={(e)=>update(["requirements","items"],parseLines(e.target.value))} /></label>
      </section>

      <section style={box}>
        <h2>Mid-page CTA</h2>
        <div style={grid}>
          <label><b>Title</b><input style={input} value={content.midCta?.title ?? ""} onChange={(e)=>update(["midCta","title"],e.target.value)} /></label>
          <label><b>Subtitle</b><input style={input} value={content.midCta?.subtitle ?? ""} onChange={(e)=>update(["midCta","subtitle"],e.target.value)} /></label>
        </div>
      </section>

      <section style={box}>
        <h2>Steps</h2>
        <label><b>Section title</b><input style={input} value={content.steps?.title ?? ""} onChange={(e)=>update(["steps","title"],e.target.value)} /></label>
        {steps.map((item:Obj,index:number)=>(
          <div key={index} style={{...box, background:"#f8fbff"}}>
            <div style={grid}>
              <label><b>Step title</b><input style={input} value={item.title ?? ""} onChange={(e)=>updateNestedItem("steps","items",index,"title",e.target.value)} /></label>
              <label><b>Description</b><textarea style={textarea} value={item.description ?? ""} onChange={(e)=>updateNestedItem("steps","items",index,"description",e.target.value)} /></label>
            </div>
            <button onClick={()=>removeItem("steps","items",index)}>Remove step</button>
          </div>
        ))}
        <button onClick={()=>addItem("steps","items",{title:"",description:""})}>+ Add step</button>
      </section>

      <section style={box}>
        <h2>Reviews</h2>
        <p>Exactly 3 review cards.</p>
        {[0,1,2].map((index)=>{
          const review = reviews[index] ?? {name:"",city:"",pay:"",text:"",imageUrl:"",initials:""};
          return <div key={index} style={{...box, background:"#f8fbff"}}>
            <h3>Review {index+1}</h3>
            <div style={grid}>
              {[["name","Name"],["city","City"],["pay","Pay text"],["initials","Initials"],["imageUrl","Image URL"]].map(([field,label])=>(
                <label key={field}><b>{label}</b><input style={input} value={review[field] ?? ""} onChange={(e)=>updateReview(index,field,e.target.value)} /></label>
              ))}
            </div>
            <label><b>Review text</b><textarea style={textarea} value={review.text ?? ""} onChange={(e)=>updateReview(index,"text",e.target.value)} /></label>
          </div>
        })}
      </section>

      <section style={box}>
        <h2>FAQ</h2>
        <label><b>Section title</b><input style={input} value={content.faq?.title ?? ""} onChange={(e)=>update(["faq","title"],e.target.value)} /></label>
        {faqs.map((item:Obj,index:number)=>(
          <div key={index} style={{...box, background:"#f8fbff"}}>
            <label><b>Question</b><input style={input} value={item.question ?? ""} onChange={(e)=>updateNestedItem("faq","items",index,"question",e.target.value)} /></label>
            <label><b>Answer</b><textarea style={textarea} value={item.answer ?? ""} onChange={(e)=>updateNestedItem("faq","items",index,"answer",e.target.value)} /></label>
            <button onClick={()=>removeItem("faq","items",index)}>Remove FAQ</button>
          </div>
        ))}
        <button onClick={()=>addItem("faq","items",{question:"",answer:""})}>+ Add FAQ</button>
      </section>

      <section style={box}>
        <h2>CTA buttons</h2>
        <div style={grid}>
          {[["hero","Hero CTA"],["middle","Middle CTA"],["sticky","Sticky CTA"]].map(([key,label])=>(
            <label key={key}><b>{label}</b><input style={input} value={content.cta?.[key] ?? ""} onChange={(e)=>update(["cta",key],e.target.value)} /></label>
          ))}
        </div>
      </section>

      <section style={box}>
        <h2>Footer trust</h2>
        <label><b>Title</b><input style={input} value={content.footerTrust?.title ?? ""} onChange={(e)=>update(["footerTrust","title"],e.target.value)} /></label>
        <label><b>Description</b><textarea style={textarea} value={content.footerTrust?.description ?? ""} onChange={(e)=>update(["footerTrust","description"],e.target.value)} /></label>
      </section>

      <section style={box}>
        <h2>Section visibility</h2>
        <div style={grid}>
          {Object.entries(content.sections ?? {}).map(([key,value])=>(
            <label key={key} style={{display:"flex",gap:8,alignItems:"center",padding:10,border:"1px solid #e0e7f1",borderRadius:9}}>
              <input type="checkbox" checked={Boolean(value)} onChange={(e)=>update(["sections",key],e.target.checked)} />
              <b>{key}</b>
            </label>
          ))}
        </div>
      </section>

      <section style={{...box,position:"sticky",bottom:12,boxShadow:"0 12px 35px rgba(16,32,63,.18)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <div><b>Phase 6.1</b><div style={{fontSize:13,color:"#66758e"}}>This version still saves and publishes in one action.</div></div>
          <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
            {message && <b>{message}</b>}
            <button onClick={saveAndPublish} disabled={saving} style={{padding:"11px 18px",fontWeight:800}}>{saving ? "Saving..." : "Save & Publish"}</button>
          </div>
        </div>
      </section>
    </main>
  );
}
