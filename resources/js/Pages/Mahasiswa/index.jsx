import React from 'react';

export default function index({ mahasiswa }) {
    return (
        <div>
            <h3>Data Mahasiswa</h3>
            <hr />

            <table border={1} cellPadding={5} style={{
                borderCollapse: 'collapse'
            }}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>NPM</th>
                        <th>Jenis Kelamin</th>
                        <th>Alamat</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mahasiswa.length === 0 ? (
                            <tr>
                                <th colSpan={5}>Data Kosong...</th>
                            </tr>
                        ) : (mahasiswa.map((mhs, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{mhs.nama}</td>
                                <td>{mhs.npm}</td>
                                <td>{mhs.jk == 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                                <td>{mhs.alamat}</td>
                            </tr>
                        ))
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}