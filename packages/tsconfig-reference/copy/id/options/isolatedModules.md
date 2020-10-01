---
display: "Modul Terisolasi"
oneline: "Pastikan setiap berkas dapat dilihat dengan aman tanpa bergantung pada impor lain"
---

Meskipun Anda dapat menggunakan TypeScript untuk menghasilkan ke kode JavaScript, penggunaan transpiler lain seperti [Babel](https://babeljs.io) juga umum untuk dilakukan. Namun, transpiler lain hanya beroperasi di satu berkas pada satu waktu, yang berarti mereka tidak dapat menerapkan transformasi kode yang bergantung pada pemahaman sistem tipe penuh.
Pembatasan ini juga berlaku untuk API `ts.transpileModule` TypeScript yang digunakan oleh beberapa alat pengembang.

Batasan ini dapat menyebabkan masalah waktu proses dengan beberapa fitur TypeScript seperti `const enum`s dan `namespace`s.
Pilihan `terisolasiModules` memberi tahu TypeScript untuk memperingatkan Anda jika menulis kode tertentu yang tidak dapat diartikan dengan benar oleh proses transpilasi berkas tunggal.

Itu tidak mengubah kode Anda atau mengubah perilaku proses pemeriksaan dan mengecek kode TypeScript.

Beberapa contoh kode yang tidak berfungsi saat `terisolasiModules` diaktifkan.

#### Ekspor Pengenal Non-Nilai

Di TypeScript, Anda dapat mengimpor _type_ dan kemudian mengekspornya:

```ts twoslash
// @noErrors
import { someType, someFunction } from "someModule";

someFunction();

export { someType, someFunction };
```

Karena tidak ada nilai untuk `someType`, `export` yang ditampilkan tidak akan mencoba mengekspornya (ini akan menjadi kesalahan waktu proses di JavaScript):

```js
export { someFunction };
```

Transpiler satu berkas tidak tahu apakah `someType` menghasilkan nilai atau tidak, jadi adalah kesalahan untuk mengekspor nama yang hanya merujuk ke sebuah tipe.

#### Non-Module Files

Jika `isolatedModules` dipilih, semua berkas implementasi harus dalam _modules_ (yang berarti memiliki beberapa bentuk `import` / `export`). Kesalahan terjadi jika berkas:

```ts twoslash
// @errors: 1208
// @isolatedModules
function fn() {}
```

Pembatasan ini tidak berlaku untuk berkas `.d.ts`

#### Referensi ke anggota `const enum`

Di TypeScript, saat mereferensikan anggota `const enum`, referensi tersebut diganti dengan nilai sebenarnya di JavaScript yang ditampilkan.

Mengubah TypeScript:

```ts twoslash
declare const enum Numbers {
  Zero = 0,
  One = 1,
}
console.log(Numbers.Zero + Numbers.One);
```

Ini untuk JavaScript:

```ts twoslash
// @showEmit
// @removeComments
declare const enum Numbers {
  Zero = 0,
  One = 1,
}
console.log(Numbers.Zero + Numbers.One);
```

Tanpa pengetahuan tentang nilai anggota ini, transpiler lain tidak dapat menggantikan referensi ke `Number`, yang akan menjadi galat dijalankan jika dibiarkan (karena tidak ada objek `Numbers` pada waktu proses).
Karena itu, ketika `isolatedModules` dipilih, akan terjadi kesalahan yang mereferensikan anggota `const enum` disekelilingnya.
