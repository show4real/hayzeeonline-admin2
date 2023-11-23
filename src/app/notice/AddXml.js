import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";
import { Button } from "antd";

import { getProducts } from "../services/productService";
import fs from "fs";

const AddXml = ({ addXml, toggle }) => {
  const [saving, setSaving] = useState(false);
  const [products, setProducts] = useState([]);
  const [rows, setRows] = useState(10000);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [rows]);

  const fetchProducts = () => {
    setLoading(true);
    getProducts({
      rows,
    })
      .then((res) => {
        setProducts(res.products.data);
        setTotal(res.products.total);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSaving(true);

    const urls = products.map((product) => product);

    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
  <loc>https://hayzeeonline.com/</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>1.00</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/products</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/brand/android-phone</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/brand/apple-phone</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/categories</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/shop</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/blog</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/brand/hp</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/brand/dell</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/brand/asus</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/brand/acer</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/brand/lenovo</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/brand/msi</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/category/tablet-ipad</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/category/laptop-apple</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/category/phone-global</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/category/phone-samsung</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/category/phone-iphone</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/category/printer-deskjet</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/about</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://hayzeeonline.com/contact</loc>
  <lastmod>2023-08-13T08:05:36+00:00</lastmod>
  <priority>0.80</priority>
</url>
      ${urls
        .map(
          (route) =>
            `<url><loc>https://hayzeeonline.com/product/${route.slug}</loc>
            <lastmod>${route.created_at}</lastmod>
            <priority>1.00</priority></url>`
        )
        .join("\n")}
    </urlset>
  `;
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      className="modal-dialog modal-dialog-top"
      isOpen={addXml !== null}
      toggle={toggle}
      style={{ maxWidth: "70%", paddingLeft: 100 }}
    >
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={toggle}
            >
              <span aria-hidden={true}>×</span>
            </button>
            {!loading && products.length > 0 && (
              <>
                <h4 className="card-title">Generate XML</h4>

                <form className="forms-sample">
                  <div style={{ float: "right" }}>
                    <Button
                      className="btn btn-outline-dark btn-sm"
                      type="submit"
                      loading={saving}
                      onClick={handleSubmit}
                    >
                      Generate XML
                    </Button>

                    <button
                      onClick={toggle}
                      className="btn btn-outline-dark btn-sm"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddXml;
