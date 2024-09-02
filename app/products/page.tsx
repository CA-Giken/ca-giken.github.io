import Link from "next/link"

export default () => {
  return (
    <main>
      <h1>Products</h1>
      <p>CA技研のこれまでの業績紹介です。</p>
      <h2>Open Source Softwares</h2>
      <ul>
        <li>
          <Link href="/products/oss/ardcino">
            Ardcino
          </Link>
        </li>
        <li>
          <Link href="/products/oss/pic-assembler">
            DC for PIC Assembler
          </Link>
        </li>
      </ul>
      <h2>Hardwares</h2>
      <h2>Research & Development</h2>
      <h2>User Supports</h2>
    </main>
  )
}