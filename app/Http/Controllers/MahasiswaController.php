<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mahasiswa = Mahasiswa::all();
        return Inertia::render('Mahasiswa/index', ['mahasiswa' => $mahasiswa]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'tNpm' => 'required|unique:mahasiswas,npm|max:7',
            'tNama' => 'required',
            'tJk' => 'required',
            'tAlamat' => 'required',
        ], [], [
            'tNpm' => 'NPM',
            'tNama' => 'Nama',
            'tJk' => 'Jenis Kelamin',
            'tAlamat' => 'Alamat',
        ]);

        $mahasiswa = new Mahasiswa();

        $mahasiswa->npm = $validateData['tNpm'];
        $mahasiswa->nama = $validateData['tNama'];
        $mahasiswa->jk = $validateData['tJk'];
        $mahasiswa->alamat = $validateData['tAlamat'];

        $mahasiswa->save();

        return redirect()->route('mahasiswa.index')->with('message', 'Data Mahasiswa baru berhasil disimpan..');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $mahasiswa = Mahasiswa::find($id);
        if ($mahasiswa) {
            return Inertia::render('Mahasiswa/form_edit', [
                'id' => $id,
                'mhs' => $mahasiswa
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mahasiswa $mahasiswa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validateData = $request->validate([
            'tNama' => 'required',
            'tJk' => 'required',
            'tAlamat' => 'required',
        ], [], [
            'tNama' => 'Nama',
            'tJk' => 'Jenis Kelamin',
            'tAlamat' => 'Alamat',
        ]);

        $mahasiswa = Mahasiswa::find($id);

        $mahasiswa->nama = $validateData['tNama'];
        $mahasiswa->jk = $validateData['tJk'];
        $mahasiswa->alamat = $validateData['tAlamat'];

        $mahasiswa->save();

        return redirect()->route('mahasiswa.index')->with('message', 'Data Mahasiswa dengan NPM: ' . $mahasiswa->npm . ' berhasil diperbarui..');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $mahasiswa = Mahasiswa::findOrFail($id);
        $nama = $mahasiswa->nama;
        $mahasiswa->delete();
        return redirect()->route('mahasiswa.index')->with('message', 'Data mahasiswa dengan NPM: ' . $mahasiswa->npm . ' berhasil dihapus');
    }

    public function formAdd()
    {
        return Inertia::render('Mahasiswa/form_add');
    }
}
